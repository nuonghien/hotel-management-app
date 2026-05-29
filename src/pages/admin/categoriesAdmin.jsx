import { useEffect, useState } from 'react'

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')

  // FETCH
  const fetchCategories = async () => {
    const res = await fetch(
      'http://localhost:3000/categories'
    )

    const data = await res.json()

    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // ADD
  const handleAdd = async () => {
    if (!name) return

    await fetch('http://localhost:3000/categories', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name
      })
    })

    setName('')

    fetchCategories()
  }

  // DELETE
  const handleDelete = async (id) => {
    await fetch(
      `http://localhost:3000/categories/${id}`,
      {
        method: 'DELETE'
      }
    )

    fetchCategories()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Categories Management
      </h1>

      {/* ADD */}
      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <input
          type="text"
          placeholder="Category name"
          className="border p-3 rounded w-full mb-3"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button
          onClick={handleAdd}
          className="bg-black text-white px-5 py-3 rounded"
        >
          Add Category
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr
                key={item.id}
                className="border-b text-center"
              >
                <td className="p-3">
                  {item.id}
                </td>

                <td>{item.name}</td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
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