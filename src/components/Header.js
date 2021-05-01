import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
                 <div className="header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                    <div className="full">
                      <div className="center-desk">
                        <div className="logo">
                          <img src="./assets/images/logo.png" alt="#" width="100" height="100" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                    <ul className="top_icon">
                      <li className="button_login"> <Link>Kayıt Ol</Link> </li>
                      <li> <Link>Giriş Yap</Link> </li>
                      <li className="mean-last">
                        <img src="./assets/images/search_icon.png" alt="#"/>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
           
            </div>
        )
    }
}
