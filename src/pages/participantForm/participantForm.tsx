import { useNavigate } from 'react-router-dom';


export default function ParticipantForm() {
    const navigate = useNavigate();
    return (
      <div className="h-screen">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              กรุณากรอกหมายเลขโทรศัพท์ 4 ตัวท้ายของท่าน
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                  หมายเลขโทรศัพท์ 4 ตัวท้าย (last 4 digits of your phone number)
                </label>
                <div className="mt-2">
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button onClick={()=>{navigate("./landing");}}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  เข้าร่วมการทดสอบ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }