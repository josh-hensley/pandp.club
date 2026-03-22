import type { AccountCreationData } from "../Interfaces";
import Auth from "../utils/auth"

const createAccount = async (accountData: AccountCreationData) => {
    try {
        const response = await fetch('/api/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    });
    const data = await response.json()
    console.log(data)
    Auth.login(data.token)
    } catch (error: unknown) {
        console.error(error)
    }
    
}

export default createAccount;