import { SignIn } from "@clerk/nextjs"

const page = () => {
    return (
        <div className="flex justify-center my-12">
            <SignIn />
        </div>
    )
}

export default page
