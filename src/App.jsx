import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  const [data, setData] = useState({
    name: '',
    column: column,
    row: row,
    blocked: [],
    selectedCells: [],
  });
  // console.log(row);
  console.log(data);



  const handleCellSelect = (row, column) => {
    const cellValue = `${row}-${column}`;
    // setData((prevData) => {
    //   if (prevData.blocked.includes(cellValue)) {
    //     alert(`Cell ${row + 1}-${column + 1} is already blocked!`); 
    //     return prevData;  
    //   } 
    //   const isSelected = prevData.selectedCells.includes(cellValue); 
    //   const selectedCells = isSelected ? prevData.selectedCells.filter(cell => cell !== cellValue) : 
    //   [...prevData.selectedCells, cellValue]; 
    //   return { 
    //     ...prevData, 
    //     selectedCells, 
    //     blocked: [...prevData.blocked, cellValue],  
    //   }; 
    // }); 
    setData((prevData) => { const isBlocked = prevData.blocked.includes(cellValue); const blocked = isBlocked ? prevData.blocked.filter(cell => cell !== cellValue) : [...prevData.blocked, cellValue]; const isSelected = prevData.selectedCells.includes(cellValue); const selectedCells = isSelected ? prevData.selectedCells.filter(cell => cell !== cellValue) : [...prevData.selectedCells, cellValue]; return { ...prevData, selectedCells, blocked, }; });
  };

  const generateTable = () => {
    let table = [];
    for (let i = 0; i < data.row; i++) {
      let children = [];
      for (let j = 0; j < data.column; j++) {
        const cellValue = `${i + 1}-${j + 1}`;
        const isSelected = data.selectedCells.includes(cellValue);
        children.push(<td key={j} onClick={() => handleCellSelect(i + 1, j + 1)}
          style={{ backgroundColor: isSelected ? 'red' : 'transparent' }} >
          {i + 1}-{j + 1} </td>);
      }
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };
  return (
    <div className='container my-5 p-4'>
      <form action="" className="form-control mb-5" >
        {/* <h1 className="my-3 text-center">Add Hall</h1> */}
        <div className="col-lg-16">
          <label htmlFor="row">Hall Name</label>
          <input type="text"
            onChange={(e) => setData((prevData) => (
              {
                ...prevData,
                name: e.target.value,
              }
            ))}
            name='name' className="form-control" />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="row">Row</label>
            <input type="number" onChange={
              (e) => {
                setRow(e.target.value)
                setData((prevData) => ({
                  ...prevData,
                  row: e.target.value,
                }))
              }} name='row' className="form-control" />
          </div>
          <div className="col-lg-6">
            <label htmlFor="column">Column</label>
            <input type="number" onChange={(e) => {
              setColumn(e.target.value)
              setData((prevData) => ({
                ...prevData,
                column: e.target.value,
              }))
            }} name='column' className="form-control" />
          </div>
          <div className="col-lg-6">
            <label htmlFor="total-seat">Total Seat Allocation</label>
            <input type="number" name='seat' value={(row * column) - data.blocked.length} className="form-control" disabled />
          </div>
          <div className="col-lg-6">
            <label htmlFor="total-seat">Blocked Seats </label>
            <input type="text" name='seat' value={data.blocked} className="form-control" disabled />
          </div>
        </div>
      </form>
      {
        row && column > 0 ?
          <>
          <h3 className='mb-5 text-center'>Hall Mapping</h3>
            <table className="table table-bordered">
              <tbody>
                {generateTable()}
              </tbody>
            </table>
          </>
          : "Please Enter Row and Column"
      }
    </div>
  )
}

export default App
