// Set up filters default object
const filters = {
    searchText: '',
    checked: false
}

// getFilters
const getFilters = () => filters;

// setFilters
const setFilters = ({ searchText, checked }) => {
    if(typeof searchText === 'string') {
        filters.searchText = searchText;
    }
    if(typeof checked === 'boolean') {
        filters.checked = checked;
    }
}

export { getFilters, setFilters }