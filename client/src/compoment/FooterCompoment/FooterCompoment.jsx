import React from 'react'
import './Style.scss'
export default function FooterCompoment() {
  return (
    <div className='footercompoment mt-3'>
      <div className="container">
      <div style={{ backgroundColor: '#2c2c2c', color: '#ccc', padding: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
      <div className='footer_left'>
        <p>
          <strong>Xem phim online</strong> miễn phí chất lượng cao với phụ đề tiếng việt - thuyết minh - lồng tiếng. Một phim - Mot chill có nhiều thể loại phim phong phú, đặc sắc, nhiều bộ phim hay nhất - mới nhất.
        </p>
        <p>
          Website <strong>Motchill</strong> với giao diện trực quan, thuận tiện, tốc độ tải nhanh, thường xuyên cập nhật các bộ phim mới, motphim hứa hẹn sẽ đem lại những trải nghiệm tốt cho người dùng.
        </p>
      </div>
      <div className='footer_right' style={{ display:'flex' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Quy định</a></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Điều khoản chung</a></li>
          <li><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Chính sách riêng tư</a></li>
        </ul>
        <div style={{ }}>
        <li><a href="#" style={{ color: '#ccc', textDecoration: 'none', marginLeft: '15px' }}>Giới thiệu</a></li>
          <img src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=322e5f60-41cb-4fd7-8e45-d8188e2d0e87" alt="DMCA Protected" style={{ marginLeft: '15px' }} />
         
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}
 