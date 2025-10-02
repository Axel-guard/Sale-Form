import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, User, FileText, Trash2, Plus } from 'lucide-react';

const SalesForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    customerCode: '',
    saleDate: new Date().toISOString().split('T')[0],
    assignedTo: '',
    dealType: '',
    courierCharges: '',
    amountReceived: '',
    bankAccount: '',
    remarks: '',
    paymentRef: '',
    products: [{ category: '', product: '', quantity: '', unitPrice: '' }]
  });

  const productData = {
    'MDVR': [
      '4ch 1080p SD Card MDVR (MR9504EC)',
      '4ch 1080p HDD MDVR (MR9704C)',
      '4ch 1080p SD, 4G, GPS MDVR (MR9504E)',
      '4ch 1080p SD, 4G, GPS MDVR (MR9504E-A3)',
      '4ch 1080p HDD, 4G, GPS MDVR (MR9704E)',
      '4ch 1080p SD, 4G, wifi, GPS MDVR (MA9504ED)',
      'TVS 4ch 1080p SD, 4G, GPS MDVR',
      '5ch MDVR SD 4g + GPS + LAN + RS232 + RS485',
      '5ch MDVR HDD 4g + GPS + LAN + RS232 + RS485',
      '8ch HDD 4g+GPS MDVR (MR9708C)',
      'AI MDVR with (DSM + ADAS) (SD+ 4g + GPS)',
      'AI MDVR with (DSM + ADAS) (SD+HDD+ 4g + GPS)'
    ],
    'Monitors & Monitor Kit': [
      '7" AV Monitor',
      '7" VGA Monitor',
      '7" HDMI Monitor',
      '7inch Heavy Duty VGA Monitor',
      '4inch AV monitor',
      '4k Recording monitor kit',
      '720 2ch Recording Monitor Kit',
      '4k Recording monitor kit 4ch'
    ],
    'Cameras': [
      '2 MP IR indoor Dome Camera',
      '2 MP IR Outdoor Bullet Camera',
      '2 MP Heavy Duty Bullet Camera',
      '2 MP Heavy Duty Dome Camera',
      'PTZ Camera',
      '4k Monitor Camera',
      'Replacement Bullet Camera 2mp',
      'Replacement Dome Camera 2 mp',
      'Replacement Dome Audio Camera',
      'Reverse Camera',
      '2mp IR Audio Camera',
      'DFMS Camera',
      'ADAS Camera',
      'BSD Camera',
      'MDVR IP Camera 2mp',
      '2mp IP Dome Audio Camera',
      '2 MP IP Camera',
      '2mp Heavy Duty Dome Camera (Waterproof)'
    ],
    'Dashcam': [
      '4 Inch 2 Ch Dashcam',
      '10 inch 2 Ch Full Touch Dashcam',
      '10 inch 2 Ch 4g, GPS, Android Dashcam',
      '4k Dashcam 12 inch',
      '2k 12 inch Dashcam',
      '2ch 4g Dashcam MT95L',
      '3ch 4g Dahscam with Rear Camera (MT95L-A3)',
      '3ch AI Dashcam ADAS + DSM (MT95L-A3)',
      '3ch AI Dashcam ADAS + DSM (MT95C)',
      '2CH AI Dashcam ADAS+ DSM (C6 Lite)',
      'Wifi Dash Cam',
      '4 inch 3 camera Dash Cam',
      '4inch Android Dashcam'
    ],
    'GPS': [
      'RealTrack GPS',
      'GPS Renewal'
    ],
    'Storage': [
      'Surveillance Grade 64GB SD Card',
      'Surveillance Grade 128GB SD Card',
      'Surveillance Grade 256GB SD Card',
      'Surveillance Grade 512GB SD Card',
      'HDD 1 TB'
    ],
    'RFID Tags': [
      '2.4G RFID Animal Ear Tag',
      '2.4G Active Tag (Card Type) HX607',
      '3MR 6700A UHF Passive Electronic tag',
      'UHF Windshield Tag MR6740A'
    ],
    'RFID Reader': [
      '2.4 GHZ RFID Active Reader (Bus)',
      '2.4 GHZ RFID Active Reader (Campus)',
      '2.4G IOT Smart RFID Reader (ZR7901P)',
      '2.4 G-Hz Omni-directional RFID Reader (MR3102E)',
      'RFID UHF Long Range Integrated Reader (MR6211E)'
    ],
    'MDVR Accessories': [
      'MDVR Loud Audio Speaker',
      '2 way Communication Device',
      'MDVR Maintenance Tool',
      'MDVR Remote',
      'MDVR Panic Button',
      'MDVR Server',
      'RS 232 Adaptor',
      '5mt Cable',
      '15mt Cable',
      '10mt Cable',
      'VGA Cable',
      'Alcohol Tester',
      'Ultra Sonic Fuel Sensor',
      'Rod Type Fuel Sensor',
      '1mt Cable',
      '3mt Cable',
      'Panic Button'
    ],
    'Other Products/Accesories/Service': [
      'Courier',
      'Leaser Printer',
      'D link Wire Bundle',
      'Wireless Receiver Transmitter',
      'Parking Sensor',
      'MDVR Installation',
      'GPS Installation',
      'Annual Manitenance Charges'
    ]
  };

  const salesPersons = ['Akash Parashar', 'Divyanshu tripathi', 'Sruti Ranjan Nayak', 'Mandeep Samal'];
  const dealTypes = ['With Bill', 'Without Bill'];
  const bankAccounts = ['IDFC (Pakka)', 'IDFC (Kaccha)', 'Canara'];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...formData.products];
    newProducts[index][field] = value;
    
    if (field === 'category') {
      newProducts[index].product = '';
    }
    
    setFormData({ ...formData, products: newProducts });
  };

  const addProductRow = () => {
    if (formData.products.length < 10) {
      setFormData({
        ...formData,
        products: [...formData.products, { category: '', product: '', quantity: '', unitPrice: '' }]
      });
    }
  };

  const removeProductRow = (index) => {
    if (formData.products.length > 1) {
      const newProducts = formData.products.filter((_, i) => i !== index);
      setFormData({ ...formData, products: newProducts });
    }
  };

  const calculateTotal = (quantity, unitPrice) => {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(unitPrice) || 0;
    return (q * p).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const productsTotal = formData.products.reduce((sum, prod) => {
      return sum + parseFloat(calculateTotal(prod.quantity, prod.unitPrice));
    }, 0);
    const courier = parseFloat(formData.courierCharges) || 0;
    return productsTotal + courier;
  };

  const calculateGST = () => {
    if (formData.dealType === 'With Bill') {
      return calculateGrandTotal() * 0.18;
    }
    return 0;
  };

  const calculateFinalTotal = () => {
    return calculateGrandTotal() + calculateGST();
  };

  const calculateFinalReceivable = () => {
    const received = parseFloat(formData.amountReceived) || 0;
    return calculateFinalTotal() - received;
  };

  const validatePage1 = () => {
    return formData.customerCode && formData.assignedTo && formData.dealType && formData.bankAccount;
  };

  const submitForm = () => {
    const finalTotal = calculateFinalTotal();
    alert(`Form submitted successfully!\nFinal Total: ₹${finalTotal.toFixed(2)}\n\nNote: To connect to Google Sheets, you'll need to set up Google Apps Script or use a service like Zapier/Make.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Company Branding */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6 border-t-4 border-indigo-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src="https://modelconverter.com/files/1738507883_eb01b7cc88.png" 
                alt="AxelGuard Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-800">AxelGuard</h1>
                <p className="text-sm text-gray-600 mt-1">Vehicle Surveillance & Security Solutions</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p className="font-semibold text-gray-800">Sales Order Form</p>
              <p>Invoice & Order Management</p>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 pt-4 border-t">
            <div className={`px-5 py-2 rounded-full font-semibold ${currentPage === 1 ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
              Step 1
            </div>
            <ChevronRight className="text-gray-400" />
            <div className={`px-5 py-2 rounded-full font-semibold ${currentPage === 2 ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}>
              Step 2
            </div>
          </div>
        </div>

        {/* Page 1: Customer Details */}
        {currentPage === 1 && (
          <div className="bg-white rounded-xl shadow-xl p-8 border-l-4 border-indigo-600">
            <div className="flex items-center mb-6 pb-4 border-b-2 border-indigo-100">
              <User className="text-indigo-600 mr-3" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Customer & Sale Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer Code / Mobile Number *
                </label>
                <input
                  type="text"
                  value={formData.customerCode}
                  onChange={(e) => handleInputChange('customerCode', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                  placeholder="Enter code or mobile"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Sale *
                </label>
                <input
                  type="date"
                  value={formData.saleDate}
                  onChange={(e) => handleInputChange('saleDate', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sale Assigned To *
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">Select person</option>
                  {salesPersons.map(person => (
                    <option key={person} value={person}>{person}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deal Type *
                </label>
                <select
                  value={formData.dealType}
                  onChange={(e) => handleInputChange('dealType', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">Select type</option>
                  {dealTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Courier Charges (₹)
                </label>
                <input
                  type="number"
                  value={formData.courierCharges}
                  onChange={(e) => handleInputChange('courierCharges', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  value={formData.amountReceived}
                  onChange={(e) => handleInputChange('amountReceived', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Account *
                </label>
                <select
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">Select account</option>
                  {bankAccounts.map(account => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Reference Number
                </label>
                <input
                  type="text"
                  value={formData.paymentRef}
                  onChange={(e) => handleInputChange('paymentRef', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="Enter reference"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                  rows="3"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => validatePage1() && setCurrentPage(2)}
                disabled={!validatePage1()}
                className={`px-10 py-4 rounded-lg font-bold text-lg flex items-center space-x-2 transition-all transform ${
                  validatePage1() 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next: Add Products</span>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Page 2: Products */}
        {currentPage === 2 && (
          <div className="bg-white rounded-xl shadow-xl p-8 border-l-4 border-indigo-600">
            <div className="flex items-center mb-6 pb-4 border-b-2 border-indigo-100">
              <FileText className="text-indigo-600 mr-3" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Product Selection</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Qty</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Unit Price (₹)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total (₹)</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.products.map((prod, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3">
                        <select
                          value={prod.category}
                          onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none text-sm"
                        >
                          <option value="">Select</option>
                          {Object.keys(productData).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={prod.product}
                          onChange={(e) => handleProductChange(index, 'product', e.target.value)}
                          disabled={!prod.category}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none text-sm disabled:bg-gray-100"
                        >
                          <option value="">Select product</option>
                          {prod.category && productData[prod.category].map(product => (
                            <option key={product} value={product}>{product}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={prod.quantity}
                          onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none text-sm"
                          placeholder="0"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={prod.unitPrice}
                          onChange={(e) => handleProductChange(index, 'unitPrice', e.target.value)}
                          className="w-28 px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none text-sm"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold text-indigo-600">
                        ₹{calculateTotal(prod.quantity, prod.unitPrice)}
                      </td>
                      <td className="px-4 py-3">
                        {formData.products.length > 1 && (
                          <button
                            onClick={() => removeProductRow(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {formData.products.length < 10 && (
              <button
                onClick={addProductRow}
                className="mt-4 px-6 py-3 border-2 border-dashed border-indigo-400 text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center space-x-2 font-semibold transition hover:border-indigo-600"
              >
                <Plus size={18} />
                <span>Add Product Row</span>
              </button>
            )}

            <div className="mt-8 pt-6 border-t-2 border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700 font-semibold">Products Total:</span>
                  <span className="text-gray-800 font-semibold">₹{formData.products.reduce((sum, prod) => {
                    return sum + parseFloat(calculateTotal(prod.quantity, prod.unitPrice));
                  }, 0).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700 font-semibold">Courier Charges:</span>
                  <span className="text-gray-800 font-semibold">₹{(parseFloat(formData.courierCharges) || 0).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-lg pt-2 border-t">
                  <span className="text-gray-700 font-semibold">Subtotal:</span>
                  <span className="text-gray-800 font-semibold">₹{calculateGrandTotal().toFixed(2)}</span>
                </div>
                
                {formData.dealType === 'With Bill' && (
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-700 font-semibold">GST (18%):</span>
                    <span className="text-gray-800 font-semibold">₹{calculateGST().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xl pt-3 border-t">
                  <span className="text-gray-800 font-bold">Grand Total:</span>
                  <span className="text-indigo-600 font-bold">₹{calculateFinalTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-lg pt-3 border-t border-dashed">
                  <span className="text-gray-700 font-semibold">Amount Received:</span>
                  <span className="text-green-600 font-semibold">₹{(parseFloat(formData.amountReceived) || 0).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-xl pt-2">
                  <span className="text-gray-800 font-bold">Final Receivable:</span>
                  <span className={`font-bold ${calculateFinalReceivable() > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₹{calculateFinalReceivable().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentPage(1)}
                className="px-10 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-300 transition shadow-md hover:shadow-lg"
              >
                ← Back
              </button>
              <button
                onClick={submitForm}
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Submit Order ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesForm;