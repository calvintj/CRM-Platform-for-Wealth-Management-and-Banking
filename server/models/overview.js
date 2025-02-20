const db = require("../config/db");

const getTotalCustomer = async (rm_number, customerRisk) => {
  if (customerRisk === "all") {
    const result = await db.query(`
      SELECT 
        ra.rm_number,
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
      conservative: parseInt(result.rows[0]?.conservative || 0, 10),
      balanced: parseInt(result.rows[0]?.balanced || 0, 10),
      moderate: parseInt(result.rows[0]?.moderate || 0, 10),
      growth: parseInt(result.rows[0]?.growth || 0, 10),
      aggressive: parseInt(result.rows[0]?.aggressive || 0, 10),
    };
  }
};

const getTotalAUM = async (rm_number, customerRisk) => {
  if (customerRisk === "all") {
    const result = await db.query(`
      SELECT 
        ra.rm_number,
        SUM(CASE WHEN ci.risk_profile IS NOT NULL THEN ca.aum ELSE 0 END) AS all_aum,
        SUM(CASE WHEN ci.risk_profile = '1 - Conservative' THEN ca.aum ELSE 0 END) AS conservative_aum,
        SUM(CASE WHEN ci.risk_profile = '2 - Balanced' THEN ca.aum ELSE 0 END) AS balanced_aum,
        SUM(CASE WHEN ci.risk_profile = '3 - Moderate' THEN ca.aum ELSE 0 END) AS moderate_aum,
        SUM(CASE WHEN ci.risk_profile = '4 - Growth' THEN ca.aum ELSE 0 END) AS growth_aum,
        SUM(CASE WHEN ci.risk_profile = '5 - Aggressive' THEN ca.aum ELSE 0 END) AS aggressive_aum
      FROM rm_account AS ra
      JOIN customer_info AS ci ON ci.assigned_rm = ra.rm_number
      LEFT JOIN current_allocation AS ca ON ca.bp_number_wm_core = ci.bp_number_wm_core
      WHERE ra.rm_number = '${rm_number}'
      GROUP BY ra.rm_number
    `);

    return {
      all: parseFloat(result.rows[0]?.all_aum || 0),
      conservative: parseFloat(result.rows[0]?.conservative_aum || 0),
      balanced: parseFloat(result.rows[0]?.balanced_aum || 0),
      moderate: parseFloat(result.rows[0]?.moderate_aum || 0),
      growth: parseFloat(result.rows[0]?.growth_aum || 0),
      aggressive: parseFloat(result.rows[0]?.aggressive_aum || 0),
    };
  }
};

const getTotalFBI = async (rm_number, customerRisk) => {
  if (customerRisk === "all") {
    const result = await db.query(`
    SELECT 
      ra.rm_number,
      SUM(ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) AS all_fbi,
      SUM(CASE WHEN ci.risk_profile = '1 - Conservative' 
              THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) ELSE 0 END) AS conservative_fbi,
      SUM(CASE WHEN ci.risk_profile = '2 - Balanced' 
              THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) ELSE 0 END) AS balanced_fbi,
      SUM(CASE WHEN ci.risk_profile = '3 - Moderate' 
              THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) ELSE 0 END) AS moderate_fbi,
      SUM(CASE WHEN ci.risk_profile = '4 - Growth' 
              THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) ELSE 0 END) AS growth_fbi,
      SUM(CASE WHEN ci.risk_profile = '5 - Aggressive' 
              THEN (ca.fbi_rd + ca.fbi_sb + ca.fbi_bac) ELSE 0 END) AS aggressive_fbi
    FROM rm_account AS ra
    JOIN customer_info AS ci ON ci.assigned_rm = ra.rm_number
    LEFT JOIN current_allocation AS ca ON ca.bp_number_wm_core = ci.bp_number_wm_core
    WHERE ra.rm_number = '${rm_number}'
    GROUP BY ra.rm_number;
    `);

    return {
      all: parseFloat(result.rows[0]?.all_fbi || 0),
      conservative: parseFloat(result.rows[0]?.conservative_fbi || 0),
      balanced: parseFloat(result.rows[0]?.balanced_fbi || 0),
      moderate: parseFloat(result.rows[0]?.moderate_fbi || 0),
      growth: parseFloat(result.rows[0]?.growth_fbi || 0),
      aggressive: parseFloat(result.rows[0]?.aggressive_fbi || 0),
    };
  }
};

module.exports = {
  getTotalCustomer,
  getTotalAUM,
  getTotalFBI,
};
