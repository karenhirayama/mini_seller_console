# Mini Seller Console

A lightweight console to triage Leads and convert them into Opportunities.

## Features

- Leads List
- Lead Detail Panel
- Convert to Opportunity
- UX/States

### Leads List

- Load from a local JSON file.
- Fields: id, name, company, email, source, score, status.
- Features: search (name/company), filter (status), sort (score desc).

### Lead Detail Panel

- Click a row to open a slide-over panel.
- Inline edit status and email (validate email format).
- Save/cancel actions with basic error handling.

### Convert to Opportunity

- Button: Convert Lead.
- Create an Opportunity with: id, name, stage, amount (optional), accountName.
- Show Opportunities in a simple table.

### UX/States

- Loading, empty, and simple error states.
- Handle ~100 leads smoothly.
- Persist filter/sort in localStorage.
- Responsive layout (desktop → mobile).

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/mini_seller_console.git
    cd mini_seller_console
    ```

2. **Install dependencies:**
    ```bash
    # Example for Node.js
    npm install
    ```

3. **Run the application:**
    ```bash
    npm start
    ```

## License

This project is licensed under the MIT License.