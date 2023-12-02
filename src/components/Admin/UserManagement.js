import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "./usermanagement.css";
const UserManagement = () => {
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const userAccountsSnapshot = await firebase
          .firestore()
          .collection("comptes")
          .get();
        const accountsData = userAccountsSnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email, // Ajouter les autres champs requis comme 'email' et 'role'
          role: doc.data().role,
          nom: doc.data().nom || "", // Ajouter le champ 'nom' avec une valeur par défaut vide
        }));
        setUserAccounts(accountsData);
      } catch (error) {
        console.error("Error fetching user accounts:", error);
      }
    };

    fetchUserAccounts();
  }, []);

  const handleDeleteAccount = async (accountId) => {
    try {
      await firebase.firestore().collection("comptes").doc(accountId).delete();
      // Après la suppression, mettre à jour l'état local pour refléter les changements
      setUserAccounts(
        userAccounts.filter((account) => account.id !== accountId)
      );
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleNameChange = async (accountId, newName) => {
    try {
      await firebase.firestore().collection("comptes").doc(accountId).update({
        nom: newName,
      });
      setUserAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === accountId ? { ...account, nom: newName } : account
        )
      );
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  return (
    <div className="container" style={{marginBottom:"300px"}}>
      <h3>Managing user accounts</h3>
      <table className="table">
        <thead>
          <tr>
            {/**<th>ID</th> */}
            <th>Email</th>
            <th>Role</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userAccounts.map((account) => (
            <tr key={account.id}>
              {/**              <td>{account.id}</td>
               */}{" "}
              <td>{account.email}</td>
              <td>{account.role}</td>
              <td>
                <input
                  type="text"
                  value={account.nom}
                  onChange={(e) => handleNameChange(account.id, e.target.value)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAccount(account.id)}
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
};

export default UserManagement;
