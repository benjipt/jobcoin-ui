import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import SignInPage from './components/SignInPage'
import JobCoinUI from './components/JobCoinUI'

const baseURL = 'https://jobcoin.gemini.com/greyhound-abruptly/api/'

export default function App() {
  // STATE HOOKS
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedInAddress, setLoggedInAddress ] = useState('')
  const [ balance, setBalance ] = useState('')
  const [ runningBalance, setRunningBalance ] = useState([])

  // PERSISTS STATE OF APPLICATION UPON REFRESH
  useEffect(() => {
    const persistedLoggedInAddress = sessionStorage.getItem('loggedInAddress')
    getData(persistedLoggedInAddress)
    // eslint-disable-next-line
  }, [])

  // RETRIEVES ADDRESS DATA FROM API
  const getData = address => {
    fetch(baseURL + 'addresses/' + address)
      .then(data => { return data.json()}, err => console.log(err))
      .then(parsedData => {
        const { balance, transactions } = parsedData
        setIsLoggedIn(true)
        setLoggedInAddress(address)
        setBalance(balance)
        createRunningBalance(transactions, address)
        // DUPLICATES ADDRESS TO LOCAL STORAGE FOR PERSISTENT STATE UPON REFRESH
        sessionStorage.setItem('loggedInAddress', address)
      }, err => console.log(err))
  }
  // SHAPES DATA FOR BALANCE HISTORY CHART ~~~~~>
  const createRunningBalance = (transactions, loggedInAddress) => {
    let currentBalance = 0
    let balanceArr = []
    for (let transaction of transactions) {
      if (transaction.toAddress === loggedInAddress) {
        currentBalance += Number(transaction.amount)
      } else {
        currentBalance -= Number(transaction.amount)
      }
      const plot = generatePlot(transaction, currentBalance)
      updateBalanceArr(plot, balanceArr)
    }
    setRunningBalance(balanceArr)
  }
  // Formats dates for chart rendering
  const generatePlot = (transaction, currentBalance) => {
    const formattedDate = format(new Date(transaction.timestamp), 'yyyy-MM-dd')
    return { amount: currentBalance, date: formattedDate }
  }
  // Ensures balance value from each day is latest balance
  const updateBalanceArr = (plot, balanceArr) => {
    const lastIndex = balanceArr.length - 1
    if (lastIndex > -1) {
      if (plot.date === balanceArr[lastIndex].date) {
        balanceArr.splice(lastIndex, 1, plot)
      } else {
        balanceArr.push(plot)
      }
    } else {
      balanceArr.push(plot)
    }
  }
  // <~~~~~ SHAPES DATA FOR BALANCE HISTORY CHART

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoggedInAddress('')
    setBalance('')
    setRunningBalance([])
    sessionStorage.clear()
  }

  return (
    <div data-testid="App-1">
      { !isLoggedIn && 
        <SignInPage
          getData={ getData } /> }

      { isLoggedIn &&
        <JobCoinUI 
          handleLogout={ handleLogout }
          address={ loggedInAddress }
          balance={ balance }
          getData={ getData }
          data={ runningBalance } /> }
    </div>
  )
}

