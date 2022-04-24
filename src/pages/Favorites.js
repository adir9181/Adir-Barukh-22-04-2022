import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Favorites({ favorites }) {
    const navigate = useNavigate()

    return (
        <div className="container mx-auto px-2 sm:px-6 lg:px-8">
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 md:gap-5 gap-y-8">
                {favorites.map((fav, i) => (
                    <div key={i} onClick={() => onClick(fav)} style={{ animationDelay: i / 7 + 's' }} 
                        className="animate-moveup opacity-0 text-center bg-slate-50 rounded-lg px-4 py-5">
                        <p className="text-xl font-medium mb-8">{fav.LocalizedName}</p>
                        <p className="">{fav.Temperature.Metric.Value}&#8451;</p>
                        <p className="mt-10">{fav.WeatherText}</p>
                    </div>
                ))}
            </div>
        </div>
    )

    function onClick(city) {
        navigate('/', { state: city })
    }
}
