import { useEffect, useState } from 'react'

export default function RoomsAdmin() {
  // ======================
  // STATE
  // ======================

  const [rooms, setRooms] = useState([])

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')

  // SEARCH + FILTER
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] =
    useState(1000000)

  // PAGINATION
  const [page, setPage] = useState(1)

  const limit = 3

  // ======================
  // FETCH ROOMS
  // ======================

  const fetchRooms = async () => {
    const res = await fetch(
      'http://localhost:3000/rooms'
    )

    const data = await res.json()

    setRooms(data)
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  // ======================
  // ADD ROOM
  // ======================

  const handleAdd = async () => {
    if (!name || !image || !price) {
      alert('Please enter all fields')
      return
    }

    await fetch('http://localhost:3000/rooms', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name,
        image,
        price,
        status: 'available'
      })
    })

    // clear input
    setName('')
    setImage('')
    setPrice('')

    // reload rooms
    fetchRooms()
  }

  // ======================
  // DELETE ROOM
  // ======================

  const handleDelete = async (id) => {
    await fetch(
      `http://localhost:3000/rooms/${id}`,
      {
        method: 'DELETE'
      }
    )

    fetchRooms()
  }

  // ======================
  // EDIT ROOM
  // ======================

  const handleEdit = async (room) => {
    const updatedName = prompt(
      'Enter new room name',
      room.name
    )

    if (!updatedName) return

    const updatedRoom = {
      ...room,
      name: updatedName
    }

    await fetch(
      `http://localhost:3000/rooms/${room.id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(updatedRoom)
      }
    )

    fetchRooms()
  }

  // ======================
  // SEARCH + FILTER
  // ======================

  const filteredRooms = rooms.filter(
    (room) =>
      room.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      room.price <= maxPrice
  )

  // ======================
  // PAGINATION
  // ======================

  const start = (page - 1) * limit

  const end = start + limit

  const currentRooms =
    filteredRooms.slice(start, end)

  const totalPages = Math.ceil(
    filteredRooms.length / limit
  )

  // ======================
  // UI
  // ======================

  return (
    <div>
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-5">
        Rooms Management
      </h1>

      {/* SEARCH */}
      <div className="flex gap-5 mb-5">
        <input
          type="text"
          placeholder="Search room..."
          className="border p-3 rounded w-full"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-3 rounded w-[200px]"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
        />
      </div>

      {/* ADD FORM */}
      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <input
          type="text"
          placeholder="Room Name"
          className="border p-3 rounded w-full mb-3"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border p-3 rounded w-full mb-3"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 rounded w-full mb-3"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button
          onClick={handleAdd}
          className="bg-black text-white px-5 py-3 rounded"
        >
          Add Room
        </button>
      </div>

      {/* ROOM LIST */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >
        {currentRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={room.image}
              alt=""
              className="w-full h-[200px] object-cover"
            />

            <div className="p-5">
              <h1 className="text-2xl font-bold">
                {room.name}
              </h1>

              <p className="mt-2 text-gray-500">
                ${room.price}
              </p>

              <p className="mt-2">
                Status:
                <span className="font-bold ml-2">
                  {room.status}
                </span>
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() =>
                    handleEdit(room)
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(room.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-10">
        <button
          onClick={() =>
            setPage(page - 1)
          }
          disabled={page === 1}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="font-bold">
          {page} / {totalPages}
        </span>

        <button
          onClick={() =>
            setPage(page + 1)
          }
          disabled={page === totalPages}
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  )
}