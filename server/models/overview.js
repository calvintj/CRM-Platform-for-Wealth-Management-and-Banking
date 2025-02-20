const db = require("../config/db");

const getTotalCustomer = async (rm_number, customerRisk) => {
  if (customerRisk === "all") {
    const result = await db.query(`
      SELECT 
        ra.rm_number,
        COUNT(DISTINCT ci.bp_number_wm_core) AS all_customers,
        COUNT(DISTINCT CASE WHEN ci.risk_profile = '1 - Conservative' THEN ci.bp_number_wm_core END) AS conservative,
        COUNT(DISTINCT CASE WHEN ci.risk_profile = '2 - Balanced' THEN ci.bp_number_wm_core END) AS balanced,
        COUNT(DISTINCT CASE WHEN ci.risk_profile = '3 - Moderate' THEN ci.bp_number_wm_core END) AS moderate,
        COUNT(DISTINCT CASE WHEN ci.risk_profile = '4 - Growth' THEN ci.bp_number_wm_core END) AS growth,
        COUNT(DISTINCT CASE WHEN ci.risk_profile = '5 - Aggressive' THEN ci.bp_number_wm_core END) AS aggressive
      FROM rm_account AS ra
      JOIN customer_info AS ci ON ci.assigned_rm = ra.rm_number
      WHERE ra.rm_number = '${rm_number}'
      GROUP BY ra.rm_number
    `);

    return {
      all: parseInt(result.rows[0]?.all_customers || 0, 10),
      conservative: parseInt(result.rows[0]?.conservative || 0, 10),
      balanced: parseInt(result.rows[0]?.balanced || 0, 10),
      moderate: parseInt(result.rows[0]?.moderate || 0, 10),
      growth: parseInt(result.rows[0]?.growth || 0, 10),
      aggressive: parseInt(result.rows[0]?.aggressive || 0, 10),
    };
  }
};

module.exports = {
  getTotalCustomer,
};
