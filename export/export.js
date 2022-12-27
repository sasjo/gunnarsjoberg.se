const mysql = require('mysql2/promise');
const { NodeHtmlMarkdown } = require('node-html-markdown');
const path = require('path');
const fs = require('fs');
const urlSlug = require('url-slug');

(async () => {
  // Export the contents from the MySQL database to Docosaurus Markdown blog posts.
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'gunnarsjoberg' });
  const [pages] = await connection.execute(`
    SELECT
      c.url as categorySlug,
      c.name as categoryName,
      p.url as pageSlug,
      p.title as pageTitle,
      p.created as pageCreated,
      p.content as pageContent
    FROM
      entry_categories ec,
      categories c,
      pages p
    WHERE
      c.id = ec.category
      AND ec.entry = p.id
      AND published = 1
  `);

  pages.forEach((page) => {
    const {
      categoryName,
      pageTitle,
      pageContent,
      pageCreated,
    } = page;
    let text = NodeHtmlMarkdown.translate(pageContent);

    const excerptEnd = text.indexOf('\n\n');
    if (excerptEnd > 0) {
      text = text.slice(0, excerptEnd) + '\n\n<!--truncate-->' + text.slice(excerptEnd);
    }

    const pageSlug = urlSlug(pageTitle);
    const content = `---
title: "${pageTitle}"
slug: ${pageSlug}
tags:
  - label: '${categoryName}'
    permalink: ${urlSlug(categoryName)}
hide_table_of_contents: true
---
${text}
`;
    const file = path.join(__dirname, '..', 'blog', `${pageCreated.toISOString().substring(0, 10)}-${pageSlug}.md`);
    fs.writeFileSync(file, content, 'utf8');
  });

  process.exit(0);
})();

