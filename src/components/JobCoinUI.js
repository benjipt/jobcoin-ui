import React from 'react'
import AppBar from './AppBar'
import BalanceCard from './BalanceCard'
import SendCard from './SendCard'
import ChartCard from './ChartCard'

export default function JobCoinUI({ address, handleLogout, balance, getData, data }) {
    return (
        <div>
            <AppBar 
                address={ address }
                handleLogout={ handleLogout } />
            <div className="container-fluid">
                <div className="row ps-3">
                    <div className="row col-lg-4 me-3">
                        <BalanceCard 
                            balance={ balance } />
                        <SendCard 
                            address={ address }
                            getData={ getData } />
                    </div>
                    <div className="row col-lg-8">
                        <ChartCard 
                            data={ data } />
                    </div>
                </div>
            </div>
        </div>
    )
}
