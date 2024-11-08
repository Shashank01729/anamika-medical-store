import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './InvoiceGenerator.css'; // Create a CSS file for styles

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const [items, setItems] = useState([{ description: '', price: '', quantity: 1 }]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [invoices, setInvoices] = useState([]);

  // Function to generate a random invoice number
  function generateInvoiceNumber() {
    return Math.floor(Math.random() * 1000000); // Random invoice number
  }

  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
    calculateTotal(values);
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0), 0);
    
    // Calculate discount amount
    const discountAmount = (discount / 100) * subtotal;

    // Calculate total after discount
    const amountAfterDiscount = subtotal - discountAmount;

    // Calculate tax amount based on the amount after discount
    const taxAmount = (tax / 100) * amountAfterDiscount;

    // Final total
    const totalAmount = amountAfterDiscount + taxAmount;

    setTotal(totalAmount);
  };

  const addItem = () => {
    setItems([...items, { description: '', price: '', quantity: 1 }]);
  };

  const saveInvoice = () => {
    const newInvoice = { customerName, invoiceNumber, items, total, discount, tax };
    setInvoices([...invoices, newInvoice]);
    resetForm();
  };

  const resetForm = () => {
    setCustomerName('');
    setInvoiceNumber(generateInvoiceNumber());
    setItems([{ description: '', price: '', quantity: 1 }]);
    setTotal(0);
    setDiscount(0);
    setTax(0);
  };

  const InvoicePDF = ({ customerName, invoiceNumber, items, total }) => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
          <Text>Invoice Number: {invoiceNumber}</Text>
          <Text>Customer Name: {customerName}</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Items</Text>
          {items.map((item, index) => (
            <Text key={index}>
              {item.description}: ₹{item.price} x {item.quantity}
            </Text>
          ))}
        </View>
        <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <div className="invoice-header">
        <h1 className='invHead'>Create Invoice</h1>
      </div>
      <div className="invoice-generator">
        <form onSubmit={(e) => e.preventDefault()} className="invoice-form">
          {/* Card for Customer Name and Items */}
          <div className="card">
            <div className="form-group">
              <label>Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="Enter customer name"
              />
            </div>
            {items.map((item, index) => (
              <div key={index} className="form-group">
                <label>Item Description:</label>
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  placeholder="Enter item description"
                />
                <label>Price (in ₹):</label>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  placeholder="Enter item price"
                />
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  min="1"
                  placeholder="Enter quantity"
                />
              </div>
            ))}
            <button type="button" onClick={addItem} className="add-item-button">Add Item</button>
          </div>

          {/* Card for Discount and Tax */}
          <div className="card">
            <div className="form-group">
              <label>Discount (%):</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  calculateTotal(items);
                }}
                placeholder="Enter discount percentage"
              />
            </div>
            <div className="form-group">
              <label>Tax (%):</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => {
                  setTax(e.target.value);
                  calculateTotal(items);
                }}
                placeholder="Enter tax percentage"
              />
            </div>
          </div>

          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button type="button" onClick={saveInvoice} className="save-invoice-button">Save Invoice</button>
        </form>
        <h3>Invoices</h3>
        {invoices.map((invoice, index) => (
          <div key={index} className="invoice-summary">
            <h4>Invoice Number: {invoice.invoiceNumber}</h4>
            <p>Customer Name: {invoice.customerName}</p>
            <PDFDownloadLink
              document={<InvoicePDF {...invoice} />}
              fileName={`invoice_${invoice.invoiceNumber}.pdf`}
              className="download-link"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
  },
  total: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default InvoiceGenerator;
