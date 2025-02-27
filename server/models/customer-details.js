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

module.exports = { getCustomerIDList, getCustomerDetails };
