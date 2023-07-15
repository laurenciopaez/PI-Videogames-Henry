import React, {useState} from 'react';

//redux
import { connect } from 'react-redux';
import { orderByRating, orderByAlphabet  } from '../redux/actions';

import styles from '../styles/home.module.css';

function Order({ orderByRating, orderByAlphabet }) {
    const [sortingType, setSortingType] =useState('')

    const handleSortingChange = (event) => {
        const selectedSortingType = event.target.value;
        setSortingType(selectedSortingType);

        if(selectedSortingType === "alphabetic") {
            console.log('alphabet')
            orderByAlphabet()
            
        } else if(selectedSortingType === 'rating') {
            console.log('rating')
            orderByRating()
            
        }

    }

    return (
        <form>
            <label>
                Order by:
                <select value={sortingType} onChange={handleSortingChange}>
                    <option value="">Choose an option</option>
                    <option value="alphabetic">Alphabetic order</option>
                    <option value="rating">Rating order</option>
                </select>
            </label>
        </form>
    )
}

  //mapea las acciones de redux a las props del componente
  const mapDispatchToProps = (dispatch) => {
    return {
      orderByAlphabet: () => dispatch(orderByAlphabet()),
      orderByRating: () => dispatch(orderByRating())
    };
  };
  
  export default connect(null, mapDispatchToProps)(Order);
  