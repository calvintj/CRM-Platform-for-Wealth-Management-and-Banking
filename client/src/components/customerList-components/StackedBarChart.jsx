// CHART.JS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  // Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// IMPORT THE PLUGIN
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  // Tooltip,
  ChartDataLabels
);

// HOOKS
import { useCustomerList } from "../../hooks/customerList-hooks/customerList";
import PropTypes from "prop-types";

const StackedBarChart = ({ setPropensity, setAum }) => {
  // Fetch customer data using a custom hook
  const customerList = useCustomerList();

  // Define categories for AUM (x-axis) and Propensity (y-axis)
  const aumCategories = ["Zero", "Low", "Medium", "High"];
  const propensityCategories = ["Low", "Medium", "High", "Qualified"];

  // -- MAPPING FUNCTIONS ------------------------------------------------------
  const mapAumToCategory = (aumLabel) => {
    if (!aumLabel) return "Low";
    if (aumLabel.includes("Zero")) return "Zero";
    if (aumLabel.includes("Low")) return "Low";
    if (aumLabel.includes("Medium")) return "Medium";
    if (aumLabel.includes("High")) return "High";
    return "Low";
  };

  const mapPropensityToCategory = (propensity) => {
    if (!propensity) return "Low";
    if (propensity.includes("Low")) return "Low";
    if (propensity.includes("Medium")) return "Medium";
    if (propensity.includes("High")) return "High";
    if (propensity.includes("Qualified")) return "Qualified";
    return "Low";
  };
  // ---------------------------------------------------------------------------

  // Build a 4x4 matrix of raw counts: countMatrix[aum][propensity]
  const generateHeatmapData = () => {
    const countMatrix = {};
    // Build matrix with raw counts
    aumCategories.forEach((aum) => {
      countMatrix[aum] = {};
      propensityCategories.forEach((prop) => {
        countMatrix[aum][prop] = 0;
      });
    });

    customerList.forEach((customer) => {
      const aumCat = mapAumToCategory(customer["AUM Label"]);
      const propCat = mapPropensityToCategory(customer.Propensity);
      countMatrix[aumCat][propCat] += 1;
    });

    // Convert raw counts to 1/0
    return {
      labels: aumCategories,
      datasets: propensityCategories.map((propensity, propIndex) => {
        return {
          label: `${propensity} Propensity`,
          data: aumCategories.map((aum) => {
            const rawCount = countMatrix[aum][propensity];
            const value = rawCount > 0 ? 1 : 0; // 1 if nonempty
            return {
              x: aum,
              y: value,
              actualCount: rawCount,
            };
          }),
          backgroundColor: aumCategories.map((_, aumIndex) => {
            if (aumIndex + propIndex === aumCategories.length - 1)
              return "#FBB716";
            else if (aumIndex + propIndex < aumCategories.length - 1)
              return "#F52720";
            else return "#01ACD2";
          }),
        };
      }),
    };
  };

  // Chart configuration
  const options = {
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const { index, datasetIndex } = elements[0];
        const aumCategory = aumCategories[index];
        const propensityCategory = propensityCategories[datasetIndex];
        const actualCount = data.datasets[datasetIndex].data[index].actualCount;

        console.log("Clicked on:", {
          aumCategory,
          propensityCategory,
          count: actualCount,
        });

        setPropensity(propensityCategory);
        setAum(aumCategory);
      } else {
        // When clicking outside of a bar, set both filters to "All"
        console.log("Clicked outside bars - resetting filters to All");
        setPropensity("All");
        setAum("All");
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Pemetaan Nasabah",
        font: {
          size: 24,
        },
        color: "white",
      },
      datalabels: {
        // Only show the label if the bar > 0
        display: (context) => {
          const { y } = context.dataset.data[context.dataIndex];
          return y > 0; // show label only if there's a nonzero segment
        },
        // Position the label inside the bar
        anchor: "center",
        align: "center",
        color: "white",
        font: {
          weight: "bold",
          size: 11,
        },
        // Format what the label displays
        formatter: (value, context) => {
          // Get the actual count
          const actualCount =
            context.dataset.data[context.dataIndex].actualCount || 0;
          // Get AUM category (from x-axis)
          const aumCategory = context.chart.data.labels[context.dataIndex];
          // Get propensity category (from dataset label)
          const propensityCategory = context.dataset.label.split(" ")[0]; // Extract first word

          return `Total: ${actualCount}\nAUM: ${aumCategory}\nPropensity: ${propensityCategory}`;
        },
      },
      // tooltip: {
      //   callbacks: {
      //     label: function (context) {
      //       const { dataset, raw } = context;
      //       const actualCount = raw.actualCount || 0;
      //       return `${dataset.label} in ${context.label} AUM: ${actualCount} customers`;
      //     },
      //   },
      // },
    },
    scales: {
      y: {
        min: 0,
        max: 4,
        stepSize: 1,
        stacked: true,
        title: {
          display: true,
          text: "Propensity",
          color: "#FFFFFF",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          callback: function (value) {
            // Show text labels at 1,2,3,4 if desired
            switch (value) {
              case 1:
                return "Low";
              case 2:
                return "Medium";
              case 3:
                return "High";
              case 4:
                return "Qualified";
              default:
                return "";
            }
          },
          color: "#FFFFFF",
        },
        grid: {
          /* ... */
        },
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Assets Under Management (AUM)",
          color: "#FFFFFF",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "#FFFFFF",
        },
        /* ... */
      },
    },
  };

  // Generate the data for the chart
  const data = generateHeatmapData();

  return (
    <div className="w-full h-full p-4">
      <Bar data={data} options={options} className="cursor-pointer" />
    </div>
  );
};

export default StackedBarChart;

StackedBarChart.propTypes = {
  setPropensity: PropTypes.func.isRequired,
  setAum: PropTypes.func.isRequired,
};
