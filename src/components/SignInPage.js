import React, { useState } from 'react'

export default function SignInPage({ getData }) {

    // STATE HOOKS
    const [ addressInput, setAddressInput ] = useState('')
    const [ submitError, setSubmitError ] = useState(false)

    const handleChange = e => {
        const { value } = e.currentTarget
        setAddressInput(value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!addressInput) {
            setSubmitError(true)
        } else {
            getData(addressInput)
        }
    }

    return (
        <div className="container text-center mt-5">
            <h1>JOBCOIN</h1>
            <div className="mt-5 p-4 border-black rounded sign-in">
                <p>Welcome! Please sign in with your JobCoin address</p>
                <hr></hr>
                <form onSubmit={ handleSubmit } className="mt-4">
                    <div className="row g-3 align-items-center justify-content-center">
                        <div className="col-auto">
                            <label htmlFor="address" className="form-label visually-hidden">Address</label>
                        </div>
                        <div className="col-auto">
                            <input onChange={ handleChange } type="text" className="form-control" id="address" placeholder="Jilly" value={ addressInput } />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </div>
                        { submitError && 
                            <div id="submitError" className="form-text pt-2">Must enter an address to sign in</div> }
                    </div>
                </form>
            </div>
        </div>
    )
}
