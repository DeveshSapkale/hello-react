import React from 'react';
import './App.css';
import AddApointment from './components/AddApointment';
import { Header } from './components/Header';
import Search from './components/Search';
import AppointmentInfo from './components/AppointmentInfo';
import { useState, useEffect, useCallback } from 'react';

function App() {
  let [appointmentdata, setAppointmentList] = useState([]);
  let [query, setQueryList] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  let fetchData = useCallback(() => {
    fetch('./appointmentdata.json')
      .then((res) => res.json())
      .then((data) => {
        setAppointmentList(data)
      })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let filteredAppointment = appointmentdata.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
  }).sort( (a, b) => {
    let order = ( orderBy === "asc" ? 1: -1);
    return a[sortBy] > b[sortBy]? 1 * order: -1 * order;
  })

  return (
    <div className='App container mx-auto mt-3 font-thin'>
      <Header title="Item To Manage?"></Header>
      <AddApointment 
      onSendAppointmentData={(data) => setAppointmentList([...appointmentdata, data])}
      lastId = {appointmentdata.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
      />
      <Search
        query={query}
        onQueryChanged={
          (query) => { setQueryList(query); }
        }
        sortBy = {sortBy}
        onSortByChanged = {(sortBy) => setSortBy(sortBy)}
        orderBy = {orderBy}
        onOrderByChanged = {(orderBy) => setOrderBy(orderBy)}
      />
      <ul className='divide-y divide-gray-200'>
        {
          filteredAppointment.map(appointment => (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onAppointmentDeleted={
                (appointmentId) => {
                  setAppointmentList(appointmentdata.filter((appointment) => appointment.id !== appointmentId))
                }
              }
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
