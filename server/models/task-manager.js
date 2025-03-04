const db = require("../config/db");

const getManagedNumbers = async (rm_number) => {
  const result = await db.query(`
SELECT 
    ra.rm_number,
    COUNT(DISTINCT CASE WHEN ci.risk_profile != '0' THEN ci.bp_number_wm_core END) AS all_customers,
    SUM(CASE WHEN ci.risk_profile != '0' THEN ca.aum ELSE 0 END) AS all_aum,
    SUM(CASE WHEN ci.risk_profile IS NOT NULL
	        THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac)ELSE 0 END) AS all_fbi
    FROM rm_account AS ra
    JOIN customer_info AS ci ON ci.assigned_rm = ra.rm_number
	RIGHT JOIN current_allocation AS ca ON ca.bp_number_wm_core = ci.bp_number_wm_core

    WHERE ra.rm_number = '${rm_number}'
    GROUP BY ra.rm_number  `);
  return result.rows[0];
};

const getIncreasedNumbers = async (rm_number) => {
  const result = await db.query(`
  WITH LastQuarters AS (
      SELECT 
          year,
          quarter,
          ROW_NUMBER() OVER (
              ORDER BY year DESC, quarter DESC
          ) AS rn
      FROM (SELECT DISTINCT year, quarter FROM current_allocation) AS q
  )
  SELECT 
      ra.rm_number,
      lq.year,
      lq.quarter AS quarter,
      COUNT(DISTINCT CASE WHEN ci.risk_profile != '0' THEN ci.bp_number_wm_core END) AS all_customers,
      SUM(CASE WHEN ci.risk_profile != '0' THEN ca.aum ELSE 0 END) AS all_aum,
      SUM(CASE WHEN ci.risk_profile IS NOT NULL THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) ELSE 0 END) AS all_fbi
  FROM rm_account AS ra
  JOIN customer_info AS ci 
      ON ci.assigned_rm = ra.rm_number
  RIGHT JOIN current_allocation AS ca 
      ON ca.bp_number_wm_core = ci.bp_number_wm_core
  JOIN LastQuarters lq 
      ON ca.year = lq.year AND ca.quarter = lq.quarter
  WHERE ra.rm_number = '${rm_number}'
    AND lq.rn <= 2
  GROUP BY ra.rm_number, lq.year, lq.quarter
  ORDER BY lq.quarter DESC;
    `);

  // Transform the results into an object with current and last quarter
  const [currentQuarter, lastQuarter] = result.rows;
  return {
    currentQuarter,
    lastQuarter,
  };
};

const getPortfolio = async (rm_number) => {
  const result = await db.query(`
  SELECT ca.casa, ca.sb, ca.deposito, ca.rd FROM current_allocation ca
  JOIN customer_info ci ON ca.bp_number_wm_core = ci.bp_number_wm_core
  WHERE ci.assigned_rm = '${rm_number}'
  ORDER BY ca.year DESC, ca.quarter DESC
  LIMIT 1;
    `);
  return result.rows;
};

const getLastTransaction = async (rm_number) => {
  const result = await db.query(`
  SELECT ht.bp_number_wm_core, ht.transaction_id, ht.jumlah_amount
FROM historical_transaction ht 
JOIN customer_info ci ON ht.bp_number_wm_core = ci.bp_number_wm_core
WHERE ci.assigned_rm = '${rm_number}'
LIMIT 5;
  `);
  return result.rows;
};

const getPotentialTransaction = async (rm_number) => {
  const result = await db.query(`
      SELECT ht.bp_number_wm_core AS id_nasabah, ht.nama_produk, ht.profit
  FROM historical_transaction ht
  JOIN customer_info ci ON ht.bp_number_wm_core = ci.bp_number_wm_core
  WHERE ci.assigned_rm = '${rm_number}'
  ORDER BY transaction_id DESC 
    `);
  return result.rows;
};

const getTask = async (rm_number) => {
  const result = await db.query(`
      SELECT description, invitee, due_date FROM rm_task_manager
      WHERE rm_number = '${rm_number}'
    `);
  return result.rows;
};

const postTask = async (task) => {
  const result = await db.query(
    `
        INSERT INTO rm_task_manager (description, invitee, due_date, rm_number)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
    [task.description, task.invitee, task.due_date, task.rm_number]
  );
  return result.rows[0];
};

module.exports = {
  getManagedNumbers,
  getIncreasedNumbers,
  getPortfolio,
  getLastTransaction,
  getPotentialTransaction,
  getTask,
  postTask,
};
