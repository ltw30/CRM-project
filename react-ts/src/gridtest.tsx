import { ColDef, ColGroupDef, ValueGetterParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";

const CustomButtonComponent = () => {
  return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
};

const GridExample = () => {
  const [rowData, setRowData] = useState<any[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);
  const [columnDefs, setColumnDefs] = useState<
    (ColDef<any, any> | ColGroupDef<any>)[]
  >([
    {
      headerName: "Make & Model",
      valueGetter: (p: ValueGetterParams) => p.data.make + " " + p.data.model,
      flex: 2,
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    { field: "electric", flex: 1 },
    { field: "button", cellRenderer: CustomButtonComponent, flex: 1 },
  ]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ width: "90vw", height: "350px" }}
        className={"ag-theme-quartz"}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

function GridTest() {
  return <GridExample />;
}

export default GridTest;
