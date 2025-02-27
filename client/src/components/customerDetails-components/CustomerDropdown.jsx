// components/customerDetails-components/CustomerDropdown.jsx
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useCustomerIDList } from "../../hooks/customerDetails-hook/customerIDList";
import PropTypes from "prop-types";

const CustomerDropdown = ({ customerID, setCustomerID }) => {
  const { data: customers, loading } = useCustomerIDList();

  // Find the currently selected customer based on customerID
  const currentCustomer = customers.find((cust) => cust.ID === customerID);
  const displayValue = currentCustomer ? currentCustomer.ID : "Select Customer";

  const handleCustomerSelect = (customer) => {
    setCustomerID(customer.ID);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-75 justify-between gap-x-1.5 rounded-lg px-3 py-2 text-sm font-semibold ring-1 shadow-xs ring-gray-300 ring-inset text-white bg-[#1D283A]">
          {loading ? "Loading..." : displayValue}
          <ChevronDownIcon
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>
      {customers && customers.length > 0 && (
        // MenuItems is absolutely positioned relative to the parent.
        // "right-0" ensures the right edge of the dropdown options aligns with the button's right edge.
        <MenuItems className="absolute right-0 z-10 mt-2 w-70 origin-top-right rounded-md border border-white shadow-lg bg-[#1D283A] text-white focus:outline-none">
          <div className="py-1">
            {customers.slice(0, 10).map((customer) => (
              <MenuItem key={customer.ID}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => handleCustomerSelect(customer)}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      active ? "bg-gray-700 text-white" : "text-gray-300"
                    }`}
                  >
                    {customer.ID}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      )}
    </Menu>
  );
};

CustomerDropdown.propTypes = {
  customerID: PropTypes.string.isRequired,
  setCustomerID: PropTypes.func.isRequired,
};

export default CustomerDropdown;
