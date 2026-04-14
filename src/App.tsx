/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Listing } from './pages/Listing';
import { Detail } from './pages/Detail';
import { Booking } from './pages/Booking';
import { Payment } from './pages/Payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="villas" element={<Listing />} />
          <Route path="villas/:id" element={<Detail />} />
          <Route path="booking" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
