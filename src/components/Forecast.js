import React from 'react'
import * as moment from 'moment'

export default function Forecast({ forecast, isMetric }) {
    if (forecast) {
        return (
            <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-5 gap-y-5">
                    {forecast.DailyForecasts?.map((day, i) => (
                        <div key={i} style={{ animationDelay: i / 7 + 's' }}
                            className="animate-moveup bg-slate-50 rounded-lg px-4 py-5 
                                dark:bg-dark-2 dark:text-slate-50 opacity-0">
                            <p className="text-center">
                                {moment(day.Date).format('ddd')}
                            </p>
                            <div className="flex justify-between mt-3">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: isMetric
                                            ? day.Temperature.Minimum.Value + "&#8451;"
                                            : day.Temperature.Minimum.Value + "&#8457;"
                                    }}>
                                    </span>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: isMetric
                                            ? day.Temperature.Maximum.Value + "&#8451;"
                                            : day.Temperature.Maximum.Value + "&#8457;"
                                    }}>
                                    </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (<></>)
    }
}
