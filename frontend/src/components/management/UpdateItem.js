import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { fixErrors, getItemDetails, updateItem } from '../../actions/ItemsActions'
import { UPDATE_ITEM_RESET } from '../../constants/itemsConstants'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateItem = () => {
    const navigate= useNavigate()
    const params= useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [categ, setCateg] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([])
    const [oldimage, setOldImage] = useState([])

    const category = [
        "Technology",
        "Food",
        "Home",
        "Clothes",
        "Medicines",
        "Animals",
        "Toys",
        "Video Games"
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, isUpdated, error: updateError} = useSelector (state => state.item)
    const { error, item} = useSelector ( state => state.itemDetails)
    const itemId= params.id;

    useEffect(() => {
        if (item && item._id !==itemId){
            dispatch(getItemDetails(itemId));
        }else{
            setName(item.name);
            setPrice(item.price);
            setDescription(item.description);
            setCateg(item.category);
            setSeller(item.seller);
            setStock(item.stock);
            setOldImage(item.image)
        }
        if(error){
            alert.error(error)
            dispatch(fixErrors)
        }
        if (updateError){
            alert.error(error)
            dispatch(fixErrors)
        }
        if(isUpdated){
            alert.success("item Updated Correctly");
            navigate("/dashboard")
            dispatch({ type: UPDATE_ITEM_RESET})
        }

    }, [dispatch, alert, error, isUpdated, updateError, item, itemId,navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', categ);
        formData.set('stock', stock);
        formData.set('seller', seller);

        image.forEach(img => {
            formData.append('image', img)
        })

        dispatch(updateItem(item._id, formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagePreview([]);
        setImage([])
        setOldImage([])

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
    <MetaData title={'Update Item'} />
    <div className ="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>

        <div className="col-12 col-md-10">
            <Fragment>
                <div className="wrapper my-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-4">Update Item</h1>

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
                                type="text"
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
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category_field">Category</label>
                            <select className="form-control" 
                            id="category_field" 
                            value={categ} 
                            onChange={(e) => setCateg(e.target.value)}>
                                {category.map(categ => (
                                    <option key={categ} value={categ} >{categ}</option>
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
                                    name='item_images'
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={onChange}
                                    multiple
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Item's Images
                         </label>
                            </div>

                            {oldimage && oldimage.map(img => (
                                <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />
                            ))}

                            {imagePreview.map(img => (
                                <img src={img} key={img} alt="Preview view" className="mt-3 mr-2" width="55" height="52" />
                            ))}

                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Update
                    </button>

                    </form>
                </div>
            </Fragment>
        </div>
    </div>

</Fragment>
  )
}