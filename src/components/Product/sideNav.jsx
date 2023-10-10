import React, { Fragment, useState } from 'react'
import { Slider, Checkbox } from '@mui/material'
import useFilter from '../../hooks/useFilter'
import formatCurrency from '../../utilities/formatCurrency'

const Sidenav = () => {

    const [price, setPrice] = useState([50000, 600000])

    const handleChange = (event, newValue) => {
        setPrice(newValue)
    }

    const { toggleChip, chip, setFiltermenu } = useFilter()

    return (
        <Fragment>
            <nav className="sidenav">
                {
                    window.innerWidth < 768 ?
                        <div className="header">
                            <div className="title">Shopping Options</div>
                            <button className="close" onClick={() => setFiltermenu(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1.75rem" viewBox="0 0 384 512">
                                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                </svg>
                            </button>
                        </div> :
                        <div className="title">Shopping Options</div>
                }
                <div className="component">
                    <div className="sub_title">Brands</div>
                    <div className="cont">
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => toggleChip('Apple')} disableRipple checked={chip.includes('Apple') ? true : false} />
                            Apple
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => toggleChip('Keychron')} disableRipple checked={chip.includes('Keychron') ? true : false} />
                            Keychron
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => toggleChip('Glorious')} disableRipple checked={chip.includes('Glorious') ? true : false} />
                            Glorious
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => toggleChip('Fantech')} disableRipple checked={chip.includes('Fantech') ? true : false} />
                            Fantech
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => toggleChip('Sony')} disableRipple checked={chip.includes('Sony') ? true : false} />
                            Sony
                        </button>
                    </div>
                </div>
                <div className="component">
                    <div className="sub_title">Price</div>
                    <div className="slider_container">
                        <Slider
                            className='slider'
                            size='sm'
                            variant='soft'
                            value={price}
                            min={10000}
                            step={1000}
                            max={1000000}
                            onChange={handleChange}
                            valueLabelDisplay='off'
                            aria-labelledby="range-slider"
                        />
                    </div>
                    <div className="desc">
                        {
                            formatCurrency(price[0])
                        }
                        -
                        {
                            formatCurrency(price[1])
                        }
                    </div>
                </div>
                {/* <div className="component">
                    <div className="sub_title">Processor</div>
                    <div className="cont">
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('Intel Core i9')} checked={fil.includes('Intel Core i9') ? true : false} />
                            Intel Core i9
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('Intel Core i7')} checked={fil.includes('Intel Core i7') ? true : false} />
                            Intel Core i7
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('Intel Core i5')} checked={fil.includes('Intel Core i5') ? true : false} />
                            Intel Core i5
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('Intel Core i3')} checked={fil.includes('Intel Core i3') ? true : false} />
                            Intel Core i3
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('AMD Ryzen 9')} checked={fil.includes('AMD Ryzen 9') ? true : false} />
                            AMD Ryzen 9
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('AMD Ryzen 7')} checked={fil.includes('AMD Ryzen 7') ? true : false} />
                            AMD Ryzen 7
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('AMD Ryzen 5')} checked={fil.includes('AMD Ryzen 5') ? true : false} />
                            AMD Ryzen 5
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('AMD Ryzen 3')} checked={fil.includes('AMD Ryzen 3') ? true : false} />
                            AMD Ryzen 3
                        </button>
                    </div>
                </div>
                <div className="component">
                    <div className="sub_title">RAM</div>
                    <div className="cont">
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('2 GB')} checked={fil.includes('2 GB') ? true : false} />
                            2 GB
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('4 GB')} checked={fil.includes('4 GB') ? true : false} />
                            4 GB
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('8 GB')} checked={fil.includes('8 GB') ? true : false} />
                            8 GB
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('16 GB')} checked={fil.includes('16 GB') ? true : false} />
                            16 GB
                        </button>
                        <button className="items">
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} onClick={() => togglefilter('32 GB')} checked={fil.includes('32 GB') ? true : false} />
                            32 GB
                        </button>
                    </div>
                </div> */}
            </nav>
        </Fragment>
    )
}

export default Sidenav