import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addstudentAsync, ALLstusnts, getallAsync, updstudentAsync, refFlag } from './studentsSlice';

export function Students() {
  const students = useAppSelector(ALLstusnts);
  const flag = useAppSelector(refFlag);
  const dispatch = useAppDispatch();
  const [sName, setsName] = useState("")
  const [score, setscore] = useState(0)
  const [profession, setprofession] = useState('Mathematics')
  const [Search, setSearch] = useState("")


  useEffect(() => {
    dispatch(getallAsync())
  }, [flag])
  return (
    <div>
      <div>
        <h3>#To add a new student fill in the fields and click the button add student</h3>
        <h3>#To update a score fill in the field score and select the profession click the button upd</h3>
        <h3>#To search fill in the field Search no button need to be click, the search is done in real time</h3>
      </div>
      <hr></hr>
       <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">Search</span>
        <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <hr></hr>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">name</span>
        <input type="text" className="form-control" placeholder="name" onChange={(e) => setsName(e.target.value)} />
      </div>
<br></br>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">score</span>
        <input type="number" className="form-control" placeholder="score" onChange={(e) => setscore(+e.target.value)} />
      </div>
      <br></br>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">profession</span>
        <select  className="form-select" onChange={(e) => setprofession(e.target.value)}>
          <option value="Mathematics">Mathematics</option>
          <option value="Computers">Computers</option>
          <option value="English">English</option>
        </select>
      </div>
      <hr></hr>
      <button className='btn btn-success' onClick={() => dispatch(addstudentAsync({ name: sName, English: profession === 'English' ? score : 0, Mathematics: profession === 'Mathematics' ? score : 0, Computers: profession === 'Computers' ? score : 0 }))}>add student</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">English</th>
            <th scope="col">Computers</th>
            <th scope="col">Mathematics</th>
            <th scope="col">upd</th>
          </tr>
        </thead>
        <tbody>
          {Search.length < 1 ? students.map((stu, i) => <tr key={i}><td>{stu.id}</td><td>{stu.name}</td><td>{stu.English}</td><td>{stu.Computers}</td><td>{stu.Mathematics}</td><button className='btn btn-warning' onClick={() => dispatch(updstudentAsync({ id: stu.id, name: stu.name, English: profession === 'English' ? score : stu.English, Mathematics: profession === 'Mathematics' ? score : stu.Mathematics, Computers: profession === 'Computers' ? score : stu.Computers }))}>upd</button></tr>) :
            students.filter(stu => stu.name.includes(Search)).map((stu, i) => <tr key={i}><td>{stu.id}</td><td>{stu.name}</td><td>{stu.English}</td><td>{stu.Computers}</td><td>{stu.Mathematics}</td><button className='btn btn-warning' onClick={() => dispatch(updstudentAsync({ id: stu.id, name: stu.name, English: profession === 'English' ? score : stu.English, Mathematics: profession === 'Mathematics' ? score : stu.Mathematics, Computers: profession === 'Computers' ? score : stu.Computers }))}>upd</button></tr>)
          }

        </tbody>
      </table>
    </div>
  );
}
