const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, '..', 'art.db'));

const getData = () => {
  return db.prepare('SELECT * FROM Paintings').all();
};

const updateData = (id, painting) => {
  const sql = `UPDATE Paintings
               SET Title = ?, YearOfWork = ?, Medium = ?,
                   Width = ?, Height = ?, Cost = ?, MSRP = ?,
                   AccessionNumber = ?, CopyrightText = ?,
                   MuseumLink = ?, WikiLink = ?,
                   Excerpt = ?, Description = ?
               WHERE PaintingID = ?`;
  return db.prepare(sql).run(
    painting.Title, painting.YearOfWork, painting.Medium,
    painting.Width, painting.Height, painting.Cost, painting.MSRP,
    painting.AccessionNumber, painting.CopyrightText,
    painting.MuseumLink, painting.WikiLink,
    painting.Excerpt, painting.Description,
    id
  );
};

module.exports = { getData, updateData };