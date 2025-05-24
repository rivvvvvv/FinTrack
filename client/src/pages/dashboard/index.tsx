import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  const totalSpend = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      if (record.amount<=0)
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  const totalEarnings = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      if (record.amount>=0)
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);



  return (
    <div className="dashboard-container">
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinancialRecordForm />
      
      <div>Total Earnings : {totalEarnings}</div>
      <div>Total Expenses : {totalSpend}</div>
      <div>Net Amount : {totalMonthly}</div>
      <FinancialRecordList />
    </div>
  );
};