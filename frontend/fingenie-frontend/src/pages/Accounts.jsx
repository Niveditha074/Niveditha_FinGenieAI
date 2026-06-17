import BackButton from "../components/BackButton";
import React, {
  useEffect,
  useState
} from "react";
 
import {
  getAllAccounts,
  createAccount,
  deleteAccount
} from "../services/accountService";
 
function Accounts() {
 
  const [accounts, setAccounts] = useState([]);
 
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountType: "",
    balance: "",
    userId: ""
  });
 
  useEffect(() => {
    loadAccounts();
  }, []);
 
  const loadAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
 
      await createAccount(formData);
 
      alert(
        "Account Created Successfully"
      );
 
      setFormData({
        accountNumber: "",
        accountType: "",
        balance: "",
        userId: ""
      });
 
      loadAccounts();
 
    } catch (error) {
 
      alert("Error Creating Account");
 
      console.log(error);
    }
  };
 
  const handleDelete = async (id) => {
 
    try {
 
      await deleteAccount(id);
 
      alert("Deleted Successfully");
 
      loadAccounts();
 
    } catch (error) {
 
      alert("Delete Failed");
    }
  };
 
  return (
    <div className="container mt-4">
 
      <h2>Accounts</h2>
 
      <form onSubmit={handleSubmit}>
 
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          className="form-control mb-2"
          value={formData.accountNumber}
          onChange={handleChange}
        />
 
        <input
          type="text"
          name="accountType"
          placeholder="Account Type"
          className="form-control mb-2"
          value={formData.accountType}
          onChange={handleChange}
        />
 
        <input
          type="number"
          name="balance"
          placeholder="Balance"
          className="form-control mb-2"
          value={formData.balance}
          onChange={handleChange}
        />
 
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          className="form-control mb-2"
          value={formData.userId}
          onChange={handleChange}
        />
 
        <button
          type="submit"
          className="btn btn-primary"
        >
          Create Account
        </button>
 
      </form>
 
      <hr />
 
      <table className="table table-bordered">
 
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
 
        <tbody>
 
          {accounts.map((account) => (
 
            <tr key={account.accountId}>
 
              <td>{account.accountId}</td>
 
              <td>{account.accountNumber}</td>
 
              <td>{account.accountType}</td>
 
              <td>{account.balance}</td>
 
              <td>{account.userId}</td>
 
              <td>
 
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(
                      account.accountId
                    )
                  }
                >
                  Delete
                </button>
 
              </td>
 
            </tr>
 
          ))}
 
        </tbody>
 
      </table>
 
    </div>
  );
}
 
export default Accounts;