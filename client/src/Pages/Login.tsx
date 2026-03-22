import { useState } from "react"
import Auth from "../utils/auth"
import type { AccountCreationData } from "../Interfaces"
import createAccount from "../services/createAccount"

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const [signupData, setSignupData] = useState<AccountCreationData>()

    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        } as AccountCreationData)
    }

    const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...loginData })
            });
        const data = await response.json();
        Auth.login(data.token)
    }

    const handleSignupSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (signupData?.password === signupData?.verification) {
            await createAccount(signupData as AccountCreationData)
        } else {
            document.querySelector('.error-msg')?.classList.add('show')
        }
    }

    const handleSwap = () => {
        document.querySelector('.login')?.classList.toggle('minimize')
        document.querySelector('.signup')?.classList.toggle('minimize')
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleLoginSubmit} >
                <fieldset>
                    <legend>Log In</legend>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={handleLoginInput} value={loginData.username} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={handleLoginInput} value={loginData.password} />
                    <button type="submit">Submit</button>
                    <p>Don't have an account? <a onClick={handleSwap}>Sign Up!</a> </p>
                </fieldset>
            </form>
            <form className="signup minimize" onSubmit={handleSignupSubmit}>
                <fieldset>
                    <legend>Sign Up!</legend>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={handleSignupInput} value={signupData?.email} />
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" onChange={handleSignupInput} value={signupData?.username} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={handleSignupInput} value={signupData?.password} />
                    <label htmlFor="verification">Verify Password: </label>
                    <input type="password" name="verification" id="verification" onChange={handleSignupInput} value={signupData?.verification} />
                    <p className="error-msg">passwords must match!</p>
                    <button type="submit">Submit</button>
                    <p>Already have an account? <a onClick={handleSwap}>Log In</a> </p>
                </fieldset>
            </form>
        </div>
    )
}

export default Login