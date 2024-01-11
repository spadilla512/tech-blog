module.exports = {
    format_date: (date) => {
        // MM/DD/YYYY format
        return date.toLocalDateString();
    },
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },
    is_my_page: (pageUser, userId) => {
        return pageUser === userId;
    },
}

