import Head from 'next/head';
import { Image, Carousel, Button, Rate } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';

import { AppLayout, BannerSportsAndMatches } from '@components/index';
import { StarSvg, CarouselArrowIcon } from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import { SportCardsSelectionType } from '@type/Main';
import styles from '@styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Daily Stakes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <HeroBanner />
        <MembershipOfferings />
        <OurDailyStandards />
        <BetOnSports />
        <Testimonials />
        <SportsNewsCarousel />
        <SubscribeNow />
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className={styles.heroBanner}>
        <div className={styles.heroBannerLeft}>
          <div className={styles.container}>
            <div className={styles.main_desc}>sports is not a game of chance,</div>
            <div className={styles.second_desc}>
              <span>it’s a game of skill</span>
            </div>
            <ul>
              <li>
                <div className={styles.square_icon} />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
              <li>
                <div className={styles.square_icon} />
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.heroBannerRight}>
          <Image
            preview={false}
            src="/images/hero_banner_right_2.svg"
            className={styles.heroBannerRightBg}
          />
          <div className={styles.container}>
            <Carousel autoplay className={styles.carousel}>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button type="primary" className={styles.carousel_slide_subscribeBtn}>
                    Subscribe Now
                  </Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button type="primary" className={styles.carousel_slide_subscribeBtn}>
                    Subscribe Now
                  </Button>
                </div>
              </div>
              <div>
                <div className={styles.carousel_slide}>
                  <div className={styles.carousel_slide_text}>Fermentum dolor bibendum eget at</div>
                  <Button type="primary" className={styles.carousel_slide_subscribeBtn}>
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
        <BannerSportsAndMatches />
      </div>
    </section>
  );
}

function MembershipOfferings() {
  return (
    <div className={styles.membershipOffers}>
      <div className={styles.membershipOffers_title}>Our Membership Offerings</div>
      <div className={styles.membershipOffers_desc}>
        Parturient luctus egestas venenatis ante euismod vitae. At molestie vitae pellentesque elit
        nam elementum nunc.
      </div>
      <div className={styles.membershipOffers_plans}>
        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>Sports Card</div>
              <div className={styles.plan_content_desc}>
                <span>3.2k Active Players</span>
                <span>100k Total Winnings</span>
              </div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <div>
                  <strong>1 sport weekly</strong> Starting at
                </div>
                <span className={styles.price}>$89.00</span>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Lorem ipsum dolor sit amet, consectetur</li>
                <li>Adipiscing elit. Sagittis pellentesque nulla</li>
                <li>Volutpat arcu. Elit, eget at neque auctor.</li>
                <li>Vignissim nisl risus vulputate Faucibus libero</li>
                <li>Morbi viverra</li>
              </ul>
              <Button className={styles.learn_more_btn}>Learn More</Button>
            </div>
          </div>
        </div>
        <div className={`${styles.plan} ${styles.main_plan}`}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>VIP ALL ACCESS CARD</div>
              <div className={styles.plan_content_desc}>
                <span>3.2k Active Players</span>
                <span>100k Total Winnings</span>
              </div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <img
                  src="/images/deal_circle.svg"
                  className={styles.deal_circle}
                  alt="Big Deal Circle"
                />
                <div>
                  <strong>All sports Daily</strong> Starting at
                </div>
                <div className={styles.price}>$40.00</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Lorem ipsum dolor sit amet, consectetur</li>
                <li>Adipiscing elit. Sagittis pellentesque nulla</li>
                <li>Volutpat arcu. Elit, eget at neque auctor.</li>
                <li>Vignissim nisl risus vulputate Faucibus libero</li>
                <li>Morbi viverra</li>
              </ul>
              <Button className={styles.learn_more_btn}>Learn More</Button>
            </div>
          </div>
          <div className={styles.plan_extra_content}>Best&nbsp;&nbsp;Deal!</div>
        </div>
        <div className={styles.plan}>
          <div className={styles.plan_content}>
            <div className={styles.plan_content_info}>
              <div className={styles.plan_content_title}>Fantasy</div>
              <div className={styles.plan_content_desc}>
                <span>3.2k Active Players</span>
                <span>100k Total Winnings</span>
              </div>
            </div>
            <div className={styles.plan_content_details}>
              <div className={styles.price_view}>
                <div>
                  <strong>Daily Lineups</strong> Starting at
                </div>
                <div className={styles.price}>$10.00</div>
              </div>
              <ul className={styles.plan_content_details_desc}>
                <li>Lorem ipsum dolor sit amet, consectetur</li>
                <li>Adipiscing elit. Sagittis pellentesque nulla</li>
                <li>Volutpat arcu. Elit, eget at neque auctor.</li>
                <li>Vignissim nisl risus vulputate Faucibus libero</li>
                <li>Morbi viverra</li>
              </ul>
              <Button className={styles.learn_more_btn}>Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OurDailyStandards() {
  return (
    <div className={styles.daily_standards}>
      <div className={styles.daily_standards_title}>
        Our daily
        <br />
        standards
      </div>
      <div className={styles.daily_standards_list}>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_analytics.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Analytical Driven</h4>
              <img src="/images/wave.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Numbers tell the story to everything we do. Every pick, every play, every action is
              researched and analysed to ensure our plays are a step ahead of the field. We never
              release a pick for the sake of filling our card (NO Fluff Picks)
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_customer.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Customer Focused</h4>
              <img src="/images/wave.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Serving our customers remains at the forefront of our business. Our entire team is
              available by email or by instagram around the clock. Refunds are given if there are
              any errors receiving picks.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_working.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Hardest Working</h4>
              <img src="/images/wave2.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Plain and simple no one else will ever out work our team. Our objective is clear, help
              you win more plays.
            </p>
          </div>
        </div>
        <div className={styles.daily_standards_item}>
          <Image
            src={'/images/daily_standards_pedigre.svg'}
            className={styles.daily_standards_icon}
          />
          <div className={styles.daily_standards_content}>
            <div className={styles.daily_standards_content_title}>
              <h4>Pedigre</h4>
              <img src="/images/wave4.svg" alt="wave" className={styles.wave_img} />
            </div>
            <p>
              Time and time again we see our picks come out on top. While we will not claim
              enormously high and unrealistic win rates, our numbers, our picks, our work, cannot be
              beat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetOnSports() {
  const [selectedCards, setSelectedCards] = useState<SportCardsSelectionType>({
    nba: false,
    nfl: false,
    mlb: false,
    ufc: false,
    f1: false,
    soccer: false
  });
  const toggleSelectCard = (prop: keyof SportCardsSelectionType) => {
    const copySelectedCards = Object.assign({}, selectedCards);
    copySelectedCards[prop] = !copySelectedCards[prop];
    setSelectedCards(copySelectedCards);
  };
  const responsive = [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
        dots: true
      }
    },
    {
      breakpoint: 882,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true,
        variableWidth: true,
        swipeToSlide: true
      }
    }
  ];
  return (
    <div className={styles.bet_on_sports}>
      <div className={styles.bet_on_sports_title}>
        Bet on any or all of these <strong>Six sports</strong>
      </div>
      <div className={styles.bet_on_sports_desc}>
        <p>Select the sports you would like to bet on and continue to checkout</p>
        <Button className={styles.checkout_btn}>Continue to checkout</Button>
      </div>
      <div className={styles.sports_cards}>
        <Carousel
          slidesToShow={6}
          infinite={false}
          dots={true}
          initialSlide={0}
          responsive={responsive}
          className="sports-cards-carousel">
          <div>
            <div className={styles.sports_card}>
              <div
                className={`${styles.sports_card_box} ${styles.nba_box} ${
                  selectedCards.nba && styles.nba_box_active
                }`}
                onClick={() => toggleSelectCard('nba')}>
                {selectedCards.nba && (
                  <img src="/images/check_mark.svg" className={styles.sports_card_checkmark} />
                )}
                <NBA_SVG className={styles.sports_card_image} />
                <div className={styles.sports_card_box_content}>
                  <h3>NBA</h3>
                  <div className={styles.desc}>
                    <div>Current record: 90-0</div>
                    <div>R.O.I: $1.4k</div>
                  </div>
                  <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Adipiscing elit</li>
                    <li>Volutpat arcu Elit eget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sports_card}>
              <div
                className={`${styles.sports_card_box} ${styles.nfl_box} ${
                  selectedCards.nfl && styles.nfl_box_active
                }`}
                onClick={() => toggleSelectCard('nfl')}>
                {selectedCards.nfl && (
                  <img src="/images/check_mark.svg" className={styles.sports_card_checkmark} />
                )}
                <NFL_SVG className={styles.sports_card_image} />
                <div className={styles.sports_card_box_content}>
                  <h3>NFL</h3>
                  <div className={styles.desc}>
                    <div>Current record: 90-0</div>
                    <div>R.O.I: $1.4k</div>
                  </div>
                  <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Adipiscing elit</li>
                    <li>Volutpat arcu Elit eget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sports_card}>
              <div
                className={`${styles.sports_card_box} ${styles.mlb_box} ${
                  selectedCards.mlb && styles.mlb_box_active
                }`}
                onClick={() => toggleSelectCard('mlb')}>
                {selectedCards.mlb && (
                  <img src="/images/check_mark.svg" className={styles.sports_card_checkmark} />
                )}
                <MLB_SVG className={styles.sports_card_image} />
                <div className={styles.sports_card_box_content}>
                  <h3>MLB</h3>
                  <div className={styles.desc}>
                    <div>Current record: 90-0</div>
                    <div>R.O.I: $1.4k</div>
                  </div>
                  <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Adipiscing elit</li>
                    <li>Volutpat arcu Elit eget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sports_card}>
              <div
                className={`${styles.sports_card_box} ${styles.ufc_box} ${
                  selectedCards.ufc && styles.ufc_box_active
                }`}
                onClick={() => toggleSelectCard('ufc')}>
                {selectedCards.ufc && (
                  <img src="/images/check_mark.svg" className={styles.sports_card_checkmark} />
                )}
                <UFC_SVG className={styles.sports_card_image} />
                <div className={styles.sports_card_box_content}>
                  <h3>UFC</h3>
                  <div className={styles.desc}>
                    <div>Current record: 90-0</div>
                    <div>R.O.I: $1.4k</div>
                  </div>
                  <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Adipiscing elit</li>
                    <li>Volutpat arcu Elit eget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sports_card}>
              <div
                className={`${styles.sports_card_box} ${styles.f1_box} ${
                  selectedCards.f1 && styles.f1_box_active
                }`}
                onClick={() => toggleSelectCard('f1')}>
                {selectedCards.f1 && (
                  <img src="/images/check_mark.svg" className={styles.sports_card_checkmark} />
                )}
                <F1_SVG className={styles.sports_card_image} />
                <div className={styles.sports_card_box_content}>
                  <h3>Formula 1</h3>
                  <div className={styles.desc}>
                    <div>Current record: 90-0</div>
                    <div>R.O.I: $1.4k</div>
                  </div>
                  <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Adipiscing elit</li>
                    <li>Volutpat arcu Elit eget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.sports_card}>
              <div
                className={`${styles.sports_card_box} ${styles.soccer_box} ${
                  selectedCards.soccer && styles.soccer_box_active
                }`}
                onClick={() => toggleSelectCard('soccer')}>
                {selectedCards.soccer && (
                  <img src="/images/check_mark.svg" className={styles.sports_card_checkmark} />
                )}
                <SOCCER_SVG className={styles.sports_card_image} />
                <div className={styles.sports_card_box_content}>
                  <h3>Soccer</h3>
                  <div className={styles.desc}>
                    <div>Current record: 90-0</div>
                    <div>R.O.I: $1.4k</div>
                  </div>
                  <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Adipiscing elit</li>
                    <li>Volutpat arcu Elit eget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <Button className={styles.mobile_checkout_btn}>Continue to checkout</Button>
    </div>
  );
}

function Testimonials() {
  return (
    <div className={styles.testimonials}>
      <Carousel
        className="testimonials-carousel"
        infinite
        dots
        initialSlide={0}
        arrows
        nextArrow={
          <div key="testimonials-carousel-prev-arrow" className="next_arrow">
            <CarouselArrowIcon />
          </div>
        }
        prevArrow={
          <div key="testimonials-carousel-prev-arrow" className="prev_arrow">
            <CarouselArrowIcon />
          </div>
        }>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <Image src="/images/testimonial1.png" className={styles.testimonial_image} />
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Louis Wheeler | Toronto</div>
                <div className={styles.testimonial_desc}>NFL Sports Card</div>
                <Rate allowHalf defaultValue={5} />
                <div className={styles.testimonial_quote}>
                  “Pellentesque elit purus integer laoreet sit cursus congue ac maecenas. Etiam
                  aenean dictum quisque nulla imperdiet feugiat duis. Convallis massa cursus non
                  quisque.”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <Image src="/images/testimonial1.png" className={styles.testimonial_image} />
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Louis Wheeler | Toronto</div>
                <div className={styles.testimonial_desc}>NFL Sports Card</div>
                <Rate allowHalf defaultValue={5} />
                <div className={styles.testimonial_quote}>
                  “Pellentesque elit purus integer laoreet sit cursus congue ac maecenas. Etiam
                  aenean dictum quisque nulla imperdiet feugiat duis. Convallis massa cursus non
                  quisque.”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <Image src="/images/testimonial1.png" className={styles.testimonial_image} />
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Louis Wheeler | Toronto</div>
                <div className={styles.testimonial_desc}>NFL Sports Card</div>
                <Rate allowHalf defaultValue={5} />
                <div className={styles.testimonial_quote}>
                  “Pellentesque elit purus integer laoreet sit cursus congue ac maecenas. Etiam
                  aenean dictum quisque nulla imperdiet feugiat duis. Convallis massa cursus non
                  quisque.”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <Image src="/images/testimonial1.png" className={styles.testimonial_image} />
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Louis Wheeler | Toronto</div>
                <div className={styles.testimonial_desc}>NFL Sports Card</div>
                <Rate allowHalf defaultValue={5} />
                <div className={styles.testimonial_quote}>
                  “Pellentesque elit purus integer laoreet sit cursus congue ac maecenas. Etiam
                  aenean dictum quisque nulla imperdiet feugiat duis. Convallis massa cursus non
                  quisque.”
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.testimonial}>
            <div className={styles.testimonial_top}>
              <StarSvg className={styles.black_star} />
            </div>
            <div className={styles.testimonial_content}>
              <Image src="/images/testimonial1.png" className={styles.testimonial_image} />
              <div className={styles.testimonial_content_right}>
                <div className={styles.testimonial_title}>Louis Wheeler | Toronto</div>
                <div className={styles.testimonial_desc}>NFL Sports Card</div>
                <Rate allowHalf defaultValue={5} />
                <div className={styles.testimonial_quote}>
                  “Pellentesque elit purus integer laoreet sit cursus congue ac maecenas. Etiam
                  aenean dictum quisque nulla imperdiet feugiat duis. Convallis massa cursus non
                  quisque.”
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

function SportsNewsCarousel() {
  return (
    <div className={styles.news_carousel}>
      <div className={styles.news_carousel_bg}>
        <div className={styles.news_carousel_content}>
          <div className={styles.title_row}>
            <span>Sports News</span>
            <Link href="/">
              <a>View More</a>
            </Link>
          </div>
          <Carousel
            className="news-carousel"
            arrows
            dots={false}
            centerMode
            variableWidth
            nextArrow={
              <div key="news-carousel-next-arrow" className="next_arrow">
                <CarouselArrowIcon />
              </div>
            }
            prevArrow={
              <div key="news-carousel-prev-arrow" className="prev_arrow">
                <CarouselArrowIcon />
              </div>
            }
            centerPadding="60px">
            <div>
              <div className={styles.news}>
                <img src="/images/news_bg.jpg" />
                <div className={styles.news_content}>
                  <p className={styles.news_info}>Formula 1 | July 31, 2020 @ 1:11 PM</p>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <p className={styles.news_desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link href="/">
                    <a>Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <img src="/images/news_bg.jpg" />
                <div className={styles.news_content}>
                  <p className={styles.news_info}>Formula 1 | July 31, 2020 @ 1:11 PM</p>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <p className={styles.news_desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link href="/">
                    <a>Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <img src="/images/news_bg.jpg" />
                <div className={styles.news_content}>
                  <p className={styles.news_info}>Formula 1 | July 31, 2020 @ 1:11 PM</p>
                  <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                  <p className={styles.news_desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Link href="/">
                    <a>Read Article</a>
                  </Link>
                </div>
                <div className="news_overlay" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

function SubscribeNow() {
  return (
    <div className={styles.subscribenow}>
      <div className={styles.subscribenow_container}>
        <div className={styles.subscribenow_left}>
          <img src="/images/curve_arrow.svg" className={styles.subscribenow_curve} />
          <div className={styles.subscribenow_title1}>Start winning now,</div>
          <div className={styles.subscribenow_title2}>it’s Ea$y!</div>
          <div className={styles.subscribenow_desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida purus ipsum.
          </div>
        </div>
        <div className={styles.subscribenow_right}>
          <div className={styles.btn_circle}>
            <img src="/images/subscribe_btn_circle.svg" />
            <Button className={styles.subscribe_btn}>Subscribe Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
