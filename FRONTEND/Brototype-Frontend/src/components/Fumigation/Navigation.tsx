
import logo from "../../../public/brototype logo.png"
const Navigation = () => {
    // function setShowModal(arg0: boolean) {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <>
            <div>
                <nav className="bg-white border-gray-200 shadow-md fixed top-0 w-full ">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto m-4">
                        <a href="" className="flex items-center">
                            <img src={logo} className="h-8 " alt="Flowbite Logo" />
                        </a>
                    </div>
                </nav>
            </div>
        </>

    );
}

export default Navigation;
