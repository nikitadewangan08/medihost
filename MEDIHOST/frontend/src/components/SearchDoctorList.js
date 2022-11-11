import React,{useState, useEffect,useReducer} from 'react';
import { MDBDataTableV5 } from "mdbreact";

const SearchDoctorList = ({doctorList}) => {
    const forceUpdate = useReducer(x => x + 1, 0)[1];
    //const [doctor, setDoctor] = useState({datatable});
    const [datatable, setDatatable] = useState({columns: [
        {
            label: 'Doctor ID',
            field: 'doctorid',
            width: 100,
        },
        {
            label: 'Name',
            field: 'doctorName',
            width: 150,
        },
        {
            label: 'Address',
            field: 'address',
            width: 250,
        },
        {
            label: 'City',
            field: 'doctorCity',
            width: 100,
        },
        {
            label: 'Contact',
            field: 'mobile',
            width: 100,
        },
        {
            label: 'Email',
            field: 'email',
            width: 100,
        }
    ],
    rows: []
});
    useEffect(() => {
        console.log('Entered SearchDoctorList use effect');
        setDatatable(prevState=>({...prevState, rows: doctorList}));
        //forceUpdate();
        
        //setDatatable({...datatable});
    },[doctorList]);

    return (
        <>
            <div className="mt-4 -striped -highlight"> 
                <MDBDataTableV5 small scrollY scrollX hover entriesOptions={[5, 10, 15, 20]} entries={5} pagesAmount={4} data={datatable} />
            </div>
            
        </>
    )
}

export default SearchDoctorList