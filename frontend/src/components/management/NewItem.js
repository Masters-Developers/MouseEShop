import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fixErrors, newItem } from '../../actions/ItemsActions'
import { NEW_ITEM_RESET } from '../../constants/itemsConstants'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'


const NewItem = () => {
    const { loading, error, success } = useSelector(state => state.newItem)
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [categ, setCateg] = useState("")
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState("")
    const [image, setImage] = useState([])
    const [imagePreview, setImagePreview] = useState([])

    const category= [
        "Technology",
        "Food",
        "Home",
        "Clothes",
        "Medicines",
        "Animals",
        "Toys",
        "Video Games"
    ]

    const navigate = useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(fixErrors)
        }
        if (success) {
            navigate("/")
            alert.success("Item Registred succesfully")
            dispatch({ type: NEW_ITEM_RESET})
        }
    }, [dispatch, alert, error, success,navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price)
        formData.set("description", description)
        formData.set("category", categ)
        formData.set("stock", stock)
        formData.set("seller", seller)

        image.forEach(img => {
            formData.append("image", img)
        })

        dispatch(newItem(formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)

        setImagePreview([])
        setImage([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(oldArray => [...oldArray, reader.result])
                    setImage(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
        
    }
    return (
        <Fragment>
            <MetaData title={'New Item'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                                <h1 className="mb-4">New Item</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="number"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control"
                                        id="category_field"
                                        value={categ}
                                        onChange={(e) => setCateg(e.target.value)}>
                                        {category.map(categ=> (
                                            <option key={categ} value={categ}>{categ}</option>
                                        ))}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='item_image'
                                            className='custom-file-input'
                                            id='customFile'
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    {imagePreview.map(img => (
                                        <img src={img} key={img} alt="Preview Item"
                                            className='mt-3 mr-2' width="55" height="55" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Create
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewItem
