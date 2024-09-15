import { useEffect, useState } from "react"
import TableData from "../Components/TableData/TableData"
import styles from "./Home.module.css"

const Home = () => {
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage)
    
    const startIndex = ( currPage - 1 ) * itemsPerPage; 
    const endIndex= startIndex + itemsPerPage;
    const displayData = data.slice(startIndex, endIndex);
    const fetchEmployeeData = async () => {
        try {
            const res = await fetch(" https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            const data = await res.json();
            setData(data);
        } catch (error) {
            alert("failed to fetch data: ", error)
        }
    }
    

    const handalePageChange = (direction) => {
        if(currPage < totalPages && direction == "next"){
            setCurrPage(currPage + 1);
        } else if(direction == "prev" && currPage > 1 ){
            setCurrPage(currPage - 1);
        }
    }

    useEffect(() => {
        fetchEmployeeData();
    }, [])

  return (
    <div className={styles.employeeData}>
        <h1>Employee Data Table</h1>

        <div className={styles.employeeDataTable}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {
                    displayData.map(data => <TableData data = {data} key={data.id}/>)
                }
                </tbody>
            </table>
        </div>

        <div className={styles.pagination}>
            <button onClick={() => handalePageChange("prev")}>Previous</button>
              <p>{currPage}</p>
            <button onClick={() => handalePageChange("next")}>Next</button>
        </div>
    </div>
  )
}

export default Home