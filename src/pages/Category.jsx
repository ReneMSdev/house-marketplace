import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

const Category = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference
        const listingRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnapshot = await getDocs(q)

        const listings = []

        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [params.categoryName])

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}
export default Category
