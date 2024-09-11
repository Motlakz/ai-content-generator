import { SignUp } from "@clerk/nextjs"

const page = () => {
    return (
        <div className="flex justify-center my-12">
            <SignUp />
        </div>
    )
}

export default page
