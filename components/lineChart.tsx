import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './title';

const data = [
    {
        name: 'Week 1',
        masuk: 6.5,
        keluar: 4,
    },
    {
        name: 'Week 2',
        masuk: 2.7,
        keluar: 3.9,
    },
    {
        name: 'Week 3',
        masuk: 0.3,
        keluar: 0,
    },
    {
        name: 'Week 4',
        masuk: 0,
        keluar: 0,
    },
];

export default function Chart() {
    return (

        <React.Fragment>
            <Title>Transaksi (Jt)</Title>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 30,
                        left: -35,
                        right: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="masuk" fill="#00C49F" label={{position: 'top',  }} />
                    <Bar dataKey="keluar" fill="#FF8042" label={{position: 'top',  }} />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

