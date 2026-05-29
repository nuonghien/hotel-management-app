import { useEffect, useState } from 'react'

export default function BookingAdmin() {
  // ======================
  // STATE
  // ======================

  const [bookings, setBookings] = useState([])

  // ======================
  // FETCH BOOKINGS
  // ======================

  const fetchBookings = async () => {
    const res = await fetch(
      'http://localhost:3000/bookings'
    )

    const data = await res.json()

    setBookings(data)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // ======================
  // UPDATE STATUS
  // ======================

  const updateStatus = async (
    id,
    status
  ) => {
    await fetch(
      `http://localhost:3000/bookings/${id}`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          status
        })
      }
    )

    fetchBookings()
  }

  // ======================
  // UI
  // ======================

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Booking Management
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Room ID</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b text-center"
              >
                <td className="p-3">
                  {booking.userId}
                </td>

                <td>{booking.roomId}</td>

                <td>{booking.checkIn}</td>

                <td>{booking.checkOut}</td>

                <td>${booking.total}</td>

                <td>
                  <span className="font-bold">
                    {booking.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        'confirmed'
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        'checkin'
                      )
                    }
                    className="bg-green-500 text-white px-3 py-2 rounded"
                  >
                    Checkin
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        'checkout'
                      )
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Checkout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}