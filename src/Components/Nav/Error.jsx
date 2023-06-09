import React from "react";
import Footer from "../Nav/Footer";
import NavBar from "./NavBar";
import "../Layouts/navStyle.css";
import "../Layouts/Error.css";

function Error() {
  return (
    <div>
      <NavBar />
      <div className="home">
        <section class="page_404">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 ">
                <div class="col-sm-10 col-sm-offset-1 text-center">
                  <div class="four_zero_four_bg">
                    <h1 class="text-center ">404</h1>
                  </div>

                  <div class="contant_box_404">
                    <h3 class="h2">Looks like you're lost</h3>

                    <p>The page you are looking for is not avaible!</p>

                    <a href="./Home" class="link_404">
                      Go to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
