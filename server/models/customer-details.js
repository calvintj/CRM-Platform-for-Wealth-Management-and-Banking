const db = require("../config/db");

const getCustomerIDList = async (rm_number) => {
  const result = await db.query(`
      SELECT 
        ci.bp_number_wm_core AS "ID",
        ci.risk_profile AS "Risk_Profile",
        ci.aum_label AS "AUM_Label",
        ci.propensity AS "Propensity",
        ci.priority_private AS "Priority_Private",
        ci.customer_type AS "Customer_Type",
        ci.pekerjaan AS "Pekerjaan",
        ci.status_nikah AS "Status_Nikah",
        ci.usia AS "Usia",
        ci.annual_income AS "Annual_Income",
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, ci.tanggal_join_wealth)) AS "Vintage",
        SUM(ca.fum) AS "Total FUM",
        SUM(ca.aum) AS "Total AUM",
        SUM(ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) AS "Total FBI"
      FROM customer_info ci
      JOIN current_allocation ca ON ci.bp_number_wm_core = ca.bp_number_wm_core
      JOIN rm_account ra ON ci.assigned_rm = ra.rm_number
      WHERE ra.rm_number = '${rm_number}'
      GROUP BY 
        ci.bp_number_wm_core,
        ci.risk_profile,
        ci.aum_label,
        ci.propensity,
        ci.priority_private,
        ci.customer_type,
        ci.pekerjaan,
        ci.status_nikah,
        ci.usia,
        ci.annual_income,
        ci.tanggal_join_wealth
      ORDER BY ci.bp_number_wm_core ASC;
    `);
  return result.rows;
};

const getCustomerDetails = async (rm_number, customerID) => {
  const result = await db.query(`
      SELECT 
        ci.bp_number_wm_core AS "ID",
        ci.risk_profile AS "Risk_Profile",
        ci.aum_label AS "AUM_Label",
        ci.propensity AS "Propensity",
        ci.priority_private AS "Priority_Private",
        ci.customer_type AS "Customer_Type",
        ci.pekerjaan AS "Pekerjaan",
        ci.status_nikah AS "Status_Nikah",
        ci.usia AS "Usia",
        ci.annual_income AS "Annual_Income",
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, ci.tanggal_join_wealth)) AS "Vintage",
        SUM(ca.fum) AS "Total_FUM",
        SUM(ca.aum) AS "Total_AUM",
        SUM(ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) AS "Total_FBI"
      FROM customer_info ci
      JOIN current_allocation ca ON ci.bp_number_wm_core = ca.bp_number_wm_core
      JOIN rm_account ra ON ci.assigned_rm = ra.rm_number
      WHERE ra.rm_number = '${rm_number}' AND ci.bp_number_wm_core = '${customerID}'
      GROUP BY 
        ci.bp_number_wm_core,
        ci.risk_profile,
        ci.aum_label,
        ci.propensity,
        ci.priority_private,
        ci.customer_type,
        ci.pekerjaan,
        ci.status_nikah,
        ci.usia,
        ci.annual_income,
        ci.tanggal_join_wealth
      ORDER BY ci.bp_number_wm_core ASC;
    `);
  return result.rows[0];
};

const getCustomerPortfolio = async (rm_number, customerID) => {
  const result = await db.query(`
SELECT ca.casa, ca.sb, ca.deposito, ca.rd FROM current_allocation ca
JOIN customer_info ci ON ca.bp_number_wm_core = ci.bp_number_wm_core
WHERE ca.bp_number_wm_core = '${customerID}' AND ci.assigned_rm = '${rm_number}'
ORDER BY ca.year DESC, ca.quarter DESC
LIMIT 1;
  `);
  return result.rows;
};

const getOptimizedPortfolio = async (rm_number, customerID) => {
  const result = await db.query(`
SELECT oa.bp_number_wm_core, oa.asset_type, oa.recommended_allocation, ci.assigned_rm
FROM optimized_allocation oa
JOIN customer_info ci ON oa.bp_number_wm_core = ci.bp_number_wm_core
WHERE ci.assigned_rm = '${rm_number}' 
  AND oa.bp_number_wm_core = '${customerID}'
ORDER BY oa.bp_number_wm_core ASC;
  `);
  return result.rows;
};

const getOwnedProduct = async (rm_number, customerID) => {
  const result = await db.query(`
    SELECT nama_produk, keterangan, jumlah_amount, price_bought, jumlah_transaksi, profit, return_value
FROM historical_transaction ht
JOIN customer_info ci ON ht.bp_number_wm_core = ci.bp_number_wm_core
WHERE ci.assigned_rm = '${rm_number}' AND ht.bp_number_wm_core = '${customerID}'
ORDER BY transaction_id DESC 
  `);
  return result.rows;
};

module.exports = {
  getCustomerIDList,
  getCustomerDetails,
  getCustomerPortfolio,
  getOptimizedPortfolio,
  getOwnedProduct,
};
