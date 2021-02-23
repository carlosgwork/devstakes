/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Row, Button, Spin } from 'antd';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import NumberFormat from 'react-number-format';

import { AppLayout, BannerSportsAndMatches, CartDrawer } from '@components/index';
import { CartItem } from '@type/Cart';
import {
  PlusIcon,
  EmptyCircleIcon,
  CheckedCircleIcon,
  NormalCheckIcon,
  MinusIcon
} from '@components/SvgIcons';
import { F1_SVG, NBA_SVG, NFL_SVG, UFC_SVG, SOCCER_SVG, MLB_SVG } from '@components/SportIcons';
import styles from '@styles/Shop.module.css';
import { PageProps } from '@type/Main';
import PackageAPIs from '@apis/package.apis';
import { BillingPlan, Package } from '@type/Packages';
import { Sport } from '@type/Sports';
import { ReduxState } from '@redux/reducers';
import { FAQsARR, FAQsDesc } from '@constants/index';

type ProductsAndCartBoxProps = {
  sports: Sport[];
  pack: Package;
  cartItems: CartItem[];
  addToCart: (pack: Package, _: CartItem[]) => void;
  changeTempCart: (pack: Package, _: CartItem[]) => void;
};
const NON_UFC_F1 = 'NON_UFC_F1';

const getDayPrice = (plan: BillingPlan) => {
  let dayPrice = plan.price;
  switch (plan.duration) {
    case 'DAILY':
      dayPrice = plan.price;
      break;
    case 'EVERY_3_DAYS':
      dayPrice = Math.round(plan.price / 3);
      break;
    case 'WEEKLY':
      dayPrice = Math.round(plan.price / 7);
      break;
    case 'MONTHLY':
      dayPrice = Math.round(plan.price / 30);
      break;
    case 'QUARTERLY':
      dayPrice = Math.round(plan.price / 90);
      break;
    case 'ANNUAL':
      dayPrice = Math.round(plan.price / 360);
      break;
    case 'SEMI_ANNUAL':
      dayPrice = Math.round(plan.price / 180);
      break;
    default:
  }
  return dayPrice;
};

export default function Shop({ token, subscriptions, packages, sports }: PageProps) {
  const { query } = useRouter();
  const [currentPlan, setCurrentPlan] = useState<string>('');
  const { items: cartItems } = useSelector((state: ReduxState) => state.cart);
  const [tempCartItems, setTempCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sports.length > 0) {
      if (typeof query.plan === 'string' && typeof query.plan !== undefined) {
        setCurrentPlan(query.plan);
      } else {
        setCurrentPlan('all');
      }
    }
  }, [query, sports]);

  useEffect(() => {
    setTempCartItems(cartItems);
  }, []);

  const changeTempCart = (pack: Package, items: CartItem[]) => {
    const newItems = tempCartItems.filter((item) => item.plan.package !== pack.id);
    if (pack.name.indexOf('VIP All Access') > -1) {
      items.forEach((item) => {
        newItems.push(item);
      });
    } else {
      items.forEach((item) => {
        const idx = newItems.findIndex(
          (cartIt) => cartIt.plan.id === item.plan.id && cartIt.sports?.id === item.sports?.id
        );
        if (idx < 0) {
          newItems.push(item);
        }
      });
    }
    setTempCartItems(newItems);
  };

  const addToCart = (pack: Package, items: CartItem[]) => {
    if (items.length === 0) {
      return;
    }
    const newItems = cartItems.filter((item) => item.plan.package !== pack.id);
    if (pack.name.indexOf('VIP All Access') > -1) {
      items.forEach((item) => {
        newItems.push(item);
      });
    } else {
      items.forEach((item) => {
        const idx = newItems.findIndex(
          (cartIt) => cartIt.plan.id === item.plan.id && cartIt.sports?.id === item.sports?.id
        );
        if (idx < 0) {
          newItems.push(item);
        }
      });
    }
    dispatch({ type: 'UPDATE_CART', payload: newItems });
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const updateCart = (items: CartItem[]) => {
    dispatch({ type: 'UPDATE_CART', payload: items });
    setTempCartItems(items);
  };

  return (
    <>
      <Head>
        <title>The Daily Stakes - Shop</title>
      </Head>
      <AppLayout token={token} subscriptions={subscriptions} bgColor={'#ffffff'}>
        {packages && (
          <CartDrawer
            open={isDrawerOpen}
            cartItems={cartItems}
            onClose={closeDrawer}
            packages={packages}
            onChangeCart={updateCart}
          />
        )}
        <HeroBanner />
        <div className={styles.container}>
          <MembershipOfferings currentPlan={currentPlan} changePlan={setCurrentPlan} />
          {currentPlan === 'sports_card' && (
            <div className={styles.offering_details}>
              <IntroForSportsCard />
              {packages && (
                <ProductsAndCartBoxForSportsCard
                  sports={sports}
                  cartItems={tempCartItems}
                  addToCart={addToCart}
                  changeTempCart={changeTempCart}
                  pack={packages.filter((pack) => pack.name === 'Sports Card')[0]}
                />
              )}
              <FAQs title={'Sports Card FAQ'} currentPlan={currentPlan} />
            </div>
          )}
          {currentPlan === 'all' && (
            <div className={styles.offering_details}>
              <Intro />
              {packages && (
                <ProductsAndCartBox
                  sports={sports}
                  cartItems={tempCartItems}
                  addToCart={addToCart}
                  changeTempCart={changeTempCart}
                  pack={packages.filter((pack) => pack.name === 'VIP All Access')[0]}
                />
              )}
              <FAQs title={'VIP All Access Card FAQ'} currentPlan={currentPlan} />
            </div>
          )}
          {currentPlan === 'fantasy' && (
            <div className={styles.offering_details}>
              <IntroForFantasy />
              {packages && (
                <ProductsAndCartBoxForFantasy
                  sports={sports}
                  cartItems={tempCartItems}
                  changeTempCart={changeTempCart}
                  addToCart={addToCart}
                  pack={packages.filter((pack) => pack.name === 'Fantasy')[0]}
                />
              )}
              <FAQs title={'FANTASY FAQ'} currentPlan={currentPlan} />
            </div>
          )}
          {currentPlan === '' && (
            <div className={styles.emptyContent}>
              <Spin size="large" />
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
}

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <img src="/images/shop_dashboard.jpg" className={styles.bgImage} />
      <div className={styles.heroBannerContent}>
        <h1>The Shop</h1>
      </div>
      <BannerSportsAndMatches />
    </div>
  );
}

type MembershipOfferingsPropsType = {
  currentPlan: string;
  changePlan: (_: string) => void;
};

function MembershipOfferings({ currentPlan, changePlan }: MembershipOfferingsPropsType) {
  return (
    <div className={styles.membershipOffers_plans}>
      <div className={`${styles.plan} ${currentPlan === 'sports_card' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => changePlan('sports_card')}>
            <div className={styles.plan_content_title}>Sports Card</div>
            <div className={styles.plan_content_desc}>
              <span>ALL PLAYS FOR THE SPORT(S) OF YOUR CHOICE.</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.plan} ${styles.main_plan} ${currentPlan === 'all' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => changePlan('all')}>
            <div className={styles.plan_content_title}>VIP ALL ACCESS CARD</div>
            <div className={styles.plan_content_desc}>
              <span>ALL PLAYS. ALL SPORTS.</span>
            </div>
            <LazyLoad>
              <img src="/images/offerings_active_ring.svg" alt="Offerings Active Background" />
            </LazyLoad>
          </div>
        </div>
        <div className={styles.plan_extra_content}>Best&nbsp;&nbsp;Deal!</div>
      </div>
      <div className={`${styles.plan} ${currentPlan === 'fantasy' && styles.active}`}>
        <div className={styles.plan_content}>
          <div className={styles.plan_content_info} onClick={() => changePlan('fantasy')}>
            <div className={styles.plan_content_title}>Fantasy</div>
            <div className={styles.plan_content_desc}>
              <span>OPTIMAL DFS LINEUPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <LazyLoad>
          <div className={styles.introSectionBg}>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </div>
        </LazyLoad>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>VIP All Access Card</div>
          <div className={styles.introDesc}>
            Includes Access to Straight Bets, Parlays, Player Props, Bonus Wildcard Parlays, & other
            Bet Types for All Sports.
          </div>
        </div>
      </Row>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Sports Include NBA, MLB, NFL, Soccer, NCAAF, NCAAB, UFC & Formula 1
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Customized Dashboard Including Automated Record Tracking
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Advanced Stats for Each Bet, Weekly Pro Tips & Bankroll Management Strategies
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Monthly & Annual Packages Include In-Game Bets
        </li>
      </ul>
      <div className={styles.extra_info}>
        *The DailyStakes Protection: For the Daily VIP All Access Card only, if over 50% of the
        plays are losses, the next day is FREE*
      </div>
    </div>
  );
}

type FAQPropsType = {
  title: string;
  currentPlan: 'all' | 'sports_card' | 'fantasy';
};

function FAQs({ title, currentPlan }: FAQPropsType) {
  const [faqIsVisible, setFaqIsVisible] = useState<boolean[]>([]);
  const toggleFAQ = (index: number) => {
    const updated = faqIsVisible.slice();
    updated[index] = !updated[index];
    setFaqIsVisible(updated);
  };

  return (
    <div className={styles.faqs}>
      <h4>{title}</h4>
      <ul>
        {FAQsARR[currentPlan].map((faq: string, index: number) => (
          <li key={index}>
            <div className={styles.faq_title}>
              {!faqIsVisible[index] && (
                <PlusIcon className={styles.faqIcon} onClick={() => toggleFAQ(index)} />
              )}
              {faqIsVisible[index] && (
                <MinusIcon className={styles.faqIcon} onClick={() => toggleFAQ(index)} />
              )}
              <span>{faq}</span>
            </div>
            {faqIsVisible[index] && (
              <p dangerouslySetInnerHTML={{ __html: FAQsDesc[currentPlan][index] }}></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsAndCartBox({
  pack,
  addToCart,
  cartItems,
  changeTempCart
}: ProductsAndCartBoxProps) {
  pack.billing_plans.sort(function (a, b) {
    return a.price - b.price >= 0 ? 1 : -1;
  });
  const [tempCart, setTempCart] = useState<CartItem[]>([]);
  const [activePlan, setActivePlan] = useState<BillingPlan>();

  useEffect(() => {
    setCartFromProps(cartItems);
  }, [cartItems]);

  const setCartFromProps = (cartItems: CartItem[]) => {
    const itemsFromCart = cartItems.filter((cartIt) => cartIt.plan.package === pack.id);
    if (itemsFromCart.length > 0) {
      setTempCart(itemsFromCart);
      setActivePlan(itemsFromCart[0].plan);
    }
  };

  const changeSportCard = (plan: BillingPlan) => {
    if (activePlan?.id !== plan.id) {
      const newCart = [
        {
          sports: undefined,
          plan,
          pack,
          auto_renewal: false,
          owner: 0
        }
      ];
      setTempCart(newCart);
      setActivePlan(plan);
      changeTempCart(pack, newCart);
    } else {
      setTempCart([]);
      setActivePlan(undefined);
      changeTempCart(pack, []);
    }
  };

  let totalPrice = 0;
  tempCart.forEach((item) => {
    totalPrice += item.plan.price;
  });

  pack.billing_plans.sort((a, b) => (a.price - b.price > 0 ? 1 : -1));
  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');

  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {billingPlans.map((plan: BillingPlan, index: number) => (
            <li
              key={index}
              className={activePlan?.id === plan.id ? styles.active : ''}
              onClick={() => changeSportCard(plan)}>
              <div className={styles.flexRow}>
                {activePlan?.id === plan.id && (
                  <CheckedCircleIcon className={styles.checkedStatusIcon} />
                )}
                {activePlan?.id !== plan.id && (
                  <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
                )}
                <span className={styles.sportsCard_name}>{plan.duration}</span>
              </div>
              <div className={styles.flexRow}>
                <div className={`${styles.sportsCard_value} ${styles.origin}`}>
                  <div className={styles.sportsCard_value_title}>Reg</div>
                  <div className={styles.sportsCard_value_price}>$199</div>
                  <div className={styles.sportsCard_value_dayprice}>$199/Day</div>
                </div>
                <div className={`${styles.sportsCard_value}`}>
                  <div className={styles.sportsCard_value_title}>Sale</div>
                  <div className={styles.sportsCard_value_content}>
                    <LazyLoad>
                      <img src="/images/shop-plan-yellow-circle.svg" alt="" />
                    </LazyLoad>
                    <div className={styles.sportsCard_value_price}>${plan.price}</div>
                    <div className={styles.sportsCard_value_dayprice}>${getDayPrice(plan)}/Day</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cartBox}>
          <LazyLoad>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </LazyLoad>
          <div className={styles.cartBoxContent}>
            <h4>Package Total</h4>
            <div className={styles.cartBoxContentDesc}>
              <div>{tempCart[0] && <p>{tempCart[0]?.plan.name}</p>}</div>
              <div className={styles.totalPrice}>
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                  fixedDecimalScale
                  value={totalPrice}
                />
              </div>
            </div>
            <Button className={styles.addToCartBtn} onClick={() => addToCart(pack, tempCart)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function IntroForFantasy() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>Fantasy Picks</div>
          <div className={styles.introDesc}>
            Includes Access to Main Slate & Single Slate Tournaments for DraftKings, Fanduel & Yahoo
            Sports Formats.
          </div>
        </div>
      </Row>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Advanced Player Stats & Trends for Each Optimal DFS Lineup Released
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Projected Points, Expected Value, Player Prop Comparisons & Bankroll Tips
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Our Annual VIP Fantasy Package Includes NBA, NFL & MLB
        </li>
      </ul>
    </div>
  );
}

function ProductsAndCartBoxForFantasy({
  sports,
  pack,
  addToCart,
  cartItems,
  changeTempCart
}: ProductsAndCartBoxProps) {
  pack.billing_plans.sort(function (a, b) {
    return a.price - b.price >= 0 ? 1 : -1;
  });
  const [tempCart, setTempCart] = useState<CartItem[]>([]);
  const [activePlan, setActivePlan] = useState<BillingPlan>();
  const [activeSports, setActiveSports] = useState<Sport[]>([]);

  useEffect(() => {
    setCartFromProps(cartItems);
  }, [cartItems]);

  const setCartFromProps = (cartItems: CartItem[]) => {
    const itemsFromCart = cartItems.filter((cartIt) => cartIt.plan.package === pack.id);
    if (itemsFromCart.length > 0) {
      setTempCart(itemsFromCart);
      setActivePlan(itemsFromCart[0].plan);
      const sports: Sport[] = [];
      itemsFromCart.forEach((cart) => {
        if (cart.sports) {
          sports.push(cart.sports);
        }
      });
      setActiveSports(sports);
    }
  };

  const changeBillingPlan = (plan: BillingPlan) => {
    const newCart: CartItem[] = [];
    if (activePlan?.id === plan.id) {
      setActivePlan(undefined);
    } else {
      activeSports.forEach((activeSport) => {
        newCart.push({
          sports: activeSport,
          plan,
          pack,
          auto_renewal: false
        });
      });
      setActivePlan(plan);
    }
    setTempCart(newCart);
    changeTempCart(pack, newCart);
  };

  const SPORTS_INFO = [
    {
      name: 'NBA',
      id: 'NBA',
      background: '#EC4C15',
      logo: () => <NBA_SVG className={styles.sports_logo} />
    },
    {
      name: 'NFL',
      id: 'NFL',
      background: '#91442A',
      logo: () => <NFL_SVG className={styles.sports_logo} />
    },
    {
      name: 'MLB',
      id: 'MLB',
      background: '#1878FB',
      logo: () => <MLB_SVG className={styles.sports_logo} />
    }
  ];

  const onChangeItemAt = (sport: Sport) => {
    const active = activeSports.slice();
    const idx = active.findIndex((sp) => sp.id === sport.id);
    if (idx < 0) {
      active.push(sport);
    } else {
      active.splice(idx, 1);
    }
    setActiveSports(active);
    const newCart: CartItem[] = [];
    if (activePlan) {
      active.forEach((activeSport) => {
        newCart.push({
          sports: activeSport,
          plan: activePlan,
          pack,
          auto_renewal: false
        });
      });
    }
    setTempCart(newCart);
    changeTempCart(pack, newCart);
  };

  let totalPrice = 0;
  tempCart.forEach((item) => {
    totalPrice += item.plan.price;
  });
  pack.billing_plans.sort((a, b) => (a.price - b.price > 0 ? 1 : -1));
  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');

  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {sports.slice(0, 3).map((sport: Sport, index: number) => (
            <div key={index}>
              <Button className={styles.dropdownBtnWrapper} onClick={() => onChangeItemAt(sport)}>
                <div
                  className={`${styles.dropdownBtn} ${
                    styles[
                      'dropdown_' +
                        SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.id
                    ]
                  }`}
                  style={{
                    background:
                      activeSports.findIndex((sp) => sp.id === sport.id) > -1
                        ? SPORTS_INFO.filter(
                            (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                          )[0]?.background
                        : ''
                  }}>
                  {SPORTS_INFO.filter(
                    (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                  )[0]?.logo()}
                  <span>{sport.name}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.sportsCards}  ${styles.sportsCardsForFantasy}`}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {billingPlans.map((plan: BillingPlan, index: number) => (
            <li
              key={index}
              className={activePlan?.id === plan.id ? styles.active : ''}
              onClick={() => changeBillingPlan(plan)}>
              <div className={styles.flexRow}>
                {activePlan?.id === plan.id && (
                  <CheckedCircleIcon className={styles.checkedStatusIcon} />
                )}
                {activePlan?.id !== plan.id && (
                  <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
                )}
                <span className={styles.sportsCard_name}>{plan.duration}</span>
              </div>
              <div className={styles.flexRow}>
                <div className={`${styles.sportsCard_value} ${styles.origin}`}>
                  <div className={styles.sportsCard_value_title}>Reg</div>
                  <div className={styles.sportsCard_value_price}>$199</div>
                  <div className={styles.sportsCard_value_dayprice}>$199/Day</div>
                </div>
                <div className={`${styles.sportsCard_value}`}>
                  <div className={styles.sportsCard_value_title}>Sale</div>
                  <div className={styles.sportsCard_value_content}>
                    <LazyLoad>
                      <img src="/images/shop-plan-yellow-circle.svg" alt="" />
                    </LazyLoad>
                    <div className={styles.sportsCard_value_price}>${plan.price}</div>
                    <div className={styles.sportsCard_value_dayprice}>${getDayPrice(plan)}/Day</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cartBox}>
          <LazyLoad>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </LazyLoad>
          <div className={styles.cartBoxContent}>
            <h4>Package Total</h4>
            <div className={styles.cartBoxContentDesc}>
              <div>
                {tempCart.length > 0 && (
                  <p>
                    {tempCart.length} Sport{tempCart.length > 1 ? 's' : ''} - {activePlan?.duration}
                  </p>
                )}
              </div>
              <div className={styles.totalPrice}>
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix={'$'}
                  decimalScale={2}
                  fixedDecimalScale
                  value={totalPrice}
                />
              </div>
            </div>
            <Button className={styles.addToCartBtn} onClick={() => addToCart(pack, tempCart)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function IntroForSportsCard() {
  return (
    <div className={styles.introSection}>
      <Row align={'top'} wrap={false} className={styles.introSectionRow}>
        <div className={styles.introContent}>
          <div className={styles.sectionTitle}>Sports Card</div>
          <div className={styles.introDesc}>
            Includes Access to Straight Bets, Parlays, Player Props, Bonus Wildcard Parlays, & other
            Bet Types for the Sport(s) of Your Choice.
          </div>
        </div>
      </Row>
      <div className={`${styles.introDesc} ${styles.mobile_introDesc}`}>
        Includes access to straight bets, parlays and betting strategies for the given sport(s) your
        choice.
      </div>
      <ul>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Customized Dashboard Including Automated Record Tracking
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Advanced Stats for Each Bet, Weekly Pro Tips & Bankroll Management Strategies
        </li>
        <li>
          <NormalCheckIcon className={styles.list_check_icon} />
          Event Based Sports Available: UFC & Formula 1
        </li>
      </ul>
      <div className={styles.extra_info}>
        *Soccer includes all Major Leagues and Tournaments Including the English Premier League,
        MLS, La Liga, Serie A, Bundesliga, UEFA Champions League, & others.
      </div>
    </div>
  );
}

function ProductsAndCartBoxForSportsCard({
  sports,
  pack,
  addToCart,
  cartItems,
  changeTempCart
}: ProductsAndCartBoxProps) {
  pack.billing_plans.sort(function (a, b) {
    return a.price - b.price >= 0 ? 1 : -1;
  });
  const [tempCart, setTempCart] = useState<CartItem[]>([]);
  // const [addOnTempCart, setAddOnTempCart] = useState<CartItem[]>([]);
  const [nonUFCAndF1Sports, setNonUFCandF1sports] = useState<Sport[]>([]);
  const [ufcAndF1Sports, setUFCandF1sports] = useState<Sport[]>([]);
  const [activeSports1, setActiveSports1] = useState<Sport[]>([]);
  const [activeSports2, setActiveSports2] = useState<Sport[]>([]);
  const [activePlan1, setActivePlan1] = useState<BillingPlan>();
  const [activePlan2, setActivePlan2] = useState<BillingPlan>();

  const setCartFromProps = (cartItems: CartItem[]) => {
    const nonUFCandF1Sports1: Sport[] = [];
    const ufcAndF1Sports1: Sport[] = [];
    sports.forEach((sport) => {
      if (sport.name === 'UFC' || sport.name === 'Formula 1') {
        ufcAndF1Sports1.push(sport);
      } else {
        nonUFCandF1Sports1.push(sport);
      }
    });
    setNonUFCandF1sports(nonUFCandF1Sports1);
    setUFCandF1sports(ufcAndF1Sports1);
    const sports1: Sport[] = [];
    const sports2: Sport[] = [];

    const itemsFromCart = cartItems.filter((cartIt) => cartIt.plan.package === pack.id);
    if (itemsFromCart.length > 0) {
      setTempCart(itemsFromCart);
      itemsFromCart.forEach((cart) => {
        if (cart.sports?.name === 'UFC' || cart.sports?.name === 'Formula 1') {
          sports2.push(cart.sports);
          setActivePlan2(cart.plan);
        } else {
          if (cart.sports) {
            sports1.push(cart.sports);
            setActivePlan1(cart.plan);
          }
        }
      });
    }
    setActiveSports1(sports1);
    setActiveSports2(sports2);
  };

  useEffect(() => {
    setCartFromProps(cartItems);
  }, [cartItems]);

  const changeBillingPlan = (plan: BillingPlan, type: string) => {
    const newCart: CartItem[] = [...tempCart];
    if (type === NON_UFC_F1) {
      const carts: CartItem[] = [];
      newCart.forEach((cartItem) => {
        if (cartItem.plan.id !== activePlan1?.id) {
          carts.push(cartItem);
        }
      });
      if (activePlan1?.id === plan.id) {
        setActivePlan1(undefined);
      } else {
        activeSports1.forEach((activeSport) => {
          carts.push({
            sports: activeSport,
            plan,
            pack,
            auto_renewal: false
          });
        });
        setActivePlan1(plan);
      }
      setTempCart(carts);
    } else {
      const carts: CartItem[] = [];
      newCart.forEach((cartItem) => {
        if (cartItem.plan.id !== activePlan2?.id) {
          carts.push(cartItem);
        }
      });
      if (activePlan2?.id === plan.id) {
        setActivePlan2(undefined);
      } else {
        activeSports2.forEach((activeSport) => {
          newCart.push({
            sports: activeSport,
            plan,
            pack,
            auto_renewal: false
          });
        });
        setActivePlan2(plan);
      }
      setTempCart(carts);
    }
    changeTempCart(pack, newCart);
  };

  const SPORTS_INFO = [
    {
      name: 'NBA',
      id: 'NBA',
      background: '#EC4C15',
      logo: () => <NBA_SVG className={styles.sports_logo} />
    },
    {
      name: 'NFL',
      id: 'NFL',
      background: '#91442A',
      logo: () => <NFL_SVG className={styles.sports_logo} />
    },
    {
      name: 'MLB',
      id: 'MLB',
      background: '#1878FB',
      logo: () => <MLB_SVG className={styles.sports_logo} />
    },
    {
      name: 'NCAAF',
      id: 'NCAAF',
      background: '#91442A',
      logo: () => <NFL_SVG className={styles.sports_logo} />
    },
    {
      name: 'NCAAB',
      id: 'NCAAB',
      background: '#EC4C15',
      logo: () => <NBA_SVG className={styles.sports_logo} />
    },
    {
      name: 'SOCCER',
      id: 'SOCCER',
      background: '#6DCF40',
      logo: () => <SOCCER_SVG className={styles.sports_logo} />
    },
    {
      name: 'UFC',
      id: 'UFC',
      background: '#F9282B',
      logo: () => <UFC_SVG className={styles.sports_logo} />
    },
    {
      name: 'FORMULA 1',
      id: 'F1',
      background: '#505054',
      logo: () => <F1_SVG className={styles.sports_logo} />
    }
  ];

  const onChangeItemAt = (sport: Sport, type: string) => {
    let newCart: CartItem[] = tempCart.slice();
    if (type === NON_UFC_F1) {
      const active = activeSports1.slice();
      const idx = active.findIndex((sp) => sp.id === sport.id);
      if (idx < 0) {
        active.push(sport);
        setActiveSports1(active);
        if (activePlan1) {
          newCart.push({
            sports: sport,
            plan: activePlan1,
            pack,
            auto_renewal: false
          });
        }
      } else {
        newCart = newCart.filter((cart) => cart.sports?.id !== sport.id);
        active.splice(idx, 1);
        setActiveSports1(active);
      }
    }
    if (type === '') {
      const active = activeSports2.slice();
      const idx = active.findIndex((sp) => sp.id === sport.id);
      if (idx < 0) {
        active.push(sport);
        setActiveSports2(active);
        if (activePlan2) {
          newCart.push({
            sports: sport,
            plan: activePlan2,
            pack,
            auto_renewal: false
          });
        }
      } else {
        active.splice(idx, 1);
        setActiveSports2(active);
        newCart = newCart.filter((cart) => cart.sports?.id !== sport.id);
      }
    }
    setTempCart(newCart);
    changeTempCart(pack, newCart);
  };

  let totalPrice = 0;
  tempCart.forEach((item) => {
    totalPrice += item.plan.price;
  });

  pack.billing_plans.sort((a, b) => (a.price - b.price > 0 ? 1 : -1));
  const billingPlans = pack.billing_plans.filter((plan) => plan.description !== 'add-on');
  const ufcAndF1CartItems = tempCart.filter(
    (cart) => cart.sports?.name === 'UFC' || cart.sports?.name === 'Formula 1'
  );
  const nonUfcAndF1CartItems = tempCart.filter(
    (cart) => cart.sports?.name !== 'UFC' && cart.sports?.name !== 'Formula 1'
  );

  return (
    <>
      <div className={styles.sportsCards}>
        <div className={styles.sectionTitle}>Select any number of sports</div>
        <div className={styles.sportsTypeContent}>
          {nonUFCAndF1Sports.map((sport: Sport, index: number) => (
            <div key={index}>
              <Button
                className={styles.dropdownBtnWrapper}
                onClick={() => onChangeItemAt(sport, NON_UFC_F1)}>
                <div
                  className={`${styles.dropdownBtn} ${
                    styles[
                      'dropdown_' +
                        SPORTS_INFO.filter(
                          (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                        )[0]?.id
                    ]
                  }`}
                  style={{
                    background:
                      activeSports1.findIndex((sp) => sp.id === sport.id) > -1
                        ? SPORTS_INFO.filter(
                            (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                          )[0]?.background
                        : ''
                  }}>
                  {SPORTS_INFO.filter(
                    (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                  )[0]?.logo()}
                  <span>{sport.name}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.sportsCards} ${styles.sportsCardsForSports}`}>
        <div className={styles.sectionTitle}>Select Card Type</div>
        <ul>
          {billingPlans.map((plan: BillingPlan, index: number) => (
            <li
              key={index}
              className={activePlan1?.id === plan.id ? styles.active : ''}
              onClick={() => changeBillingPlan(plan, NON_UFC_F1)}>
              <div className={styles.flexRow}>
                {activePlan1?.id === plan.id && (
                  <CheckedCircleIcon className={styles.checkedStatusIcon} />
                )}
                {activePlan1?.id !== plan.id && (
                  <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
                )}
                <span className={styles.sportsCard_name}>{plan.duration}</span>
              </div>
              <div className={styles.flexRow}>
                <div className={`${styles.sportsCard_value} ${styles.origin}`}>
                  <div className={styles.sportsCard_value_title}>Reg</div>
                  <div className={styles.sportsCard_value_price}>$199</div>
                  <div className={styles.sportsCard_value_dayprice}>$199/Day</div>
                </div>
                <div className={`${styles.sportsCard_value}`}>
                  <div className={styles.sportsCard_value_title}>Sale</div>
                  <div className={styles.sportsCard_value_content}>
                    <LazyLoad>
                      <img src="/images/shop-plan-yellow-circle.svg" alt="" />
                    </LazyLoad>
                    <div className={styles.sportsCard_value_price}>${plan.price}</div>
                    <div className={styles.sportsCard_value_dayprice}>${getDayPrice(plan)}/Day</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.sportsCards}>
          <div className={styles.sectionTitle}>Event based daily cards</div>
          <div className={styles.sportsTypeContent}>
            {ufcAndF1Sports.map((sport: Sport, index: number) => (
              <div key={index}>
                <Button
                  className={styles.dropdownBtnWrapper}
                  onClick={() => onChangeItemAt(sport, '')}>
                  <div
                    className={`${styles.dropdownBtn} ${
                      styles[
                        'dropdown_' +
                          SPORTS_INFO.filter(
                            (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                          )[0]?.id
                      ]
                    }`}
                    style={{
                      background:
                        activeSports2.findIndex((sp) => sp.id === sport.id) > -1
                          ? SPORTS_INFO.filter(
                              (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                            )[0]?.background
                          : ''
                    }}>
                    {SPORTS_INFO.filter(
                      (sp) => sp.name.toUpperCase() === sport.name.toUpperCase()
                    )[0]?.logo()}
                    <span>{sport.name}</span>
                  </div>
                </Button>
              </div>
            ))}
          </div>
          <ul>
            {billingPlans
              .filter((plan) => plan.name.indexOf('UFC') > -1)
              .map((plan: BillingPlan, index: number) => (
                <li
                  key={index}
                  className={activePlan2?.id === plan.id ? styles.active : ''}
                  onClick={() => changeBillingPlan(plan, '')}>
                  <div className={styles.flexRow}>
                    {activePlan2?.id === plan.id && (
                      <CheckedCircleIcon className={styles.checkedStatusIcon} />
                    )}
                    {activePlan2?.id !== plan.id && (
                      <EmptyCircleIcon className={styles.uncheckedStatusIcon} />
                    )}
                    <span className={styles.sportsCard_name}>{plan.duration}</span>
                  </div>
                  <div className={styles.flexRow}>
                    <div className={`${styles.sportsCard_value} ${styles.origin}`}>
                      <div className={styles.sportsCard_value_title}>Reg</div>
                      <div className={styles.sportsCard_value_price}>$99</div>
                      <div className={styles.sportsCard_value_dayprice}>$99/Day</div>
                    </div>
                    <div className={`${styles.sportsCard_value}`}>
                      <div className={styles.sportsCard_value_title}>Sale</div>
                      <div className={styles.sportsCard_value_content}>
                        <LazyLoad>
                          <img src="/images/shop-plan-yellow-circle.svg" alt="" />
                        </LazyLoad>
                        <div className={styles.sportsCard_value_price}>${plan.price}</div>
                        <div className={styles.sportsCard_value_dayprice}>
                          ${getDayPrice(plan)}/Day
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.cartBox}>
          <LazyLoad>
            <img src="/images/All-sports-bg.svg" alt="All Sports Background" />
          </LazyLoad>
          <div className={styles.cartBoxContent}>
            <h4>Package Total</h4>
            <div className={styles.cartBoxContentDesc}>
              <div>
                {activePlan1 && nonUfcAndF1CartItems.length > 0 && (
                  <p>
                    {nonUfcAndF1CartItems.length} Sport{nonUfcAndF1CartItems.length > 1 ? 's' : ''}{' '}
                    - {activePlan1.duration}
                  </p>
                )}
                {activePlan2 && ufcAndF1CartItems.length > 0 && (
                  <p>
                    {ufcAndF1CartItems.length} Daily Card{ufcAndF1CartItems.length > 1 ? 's' : ''} -{' '}
                    {activePlan2.duration}
                  </p>
                )}
              </div>
              <div className={styles.totalPrice}>
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix={'$'}
                  fixedDecimalScale
                  decimalScale={2}
                  value={totalPrice}
                />
              </div>
            </div>
            <Button className={styles.addToCartBtn} onClick={() => addToCart(pack, tempCart)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await PackageAPIs.getPackages();
  const packages = await res.json();

  return {
    props: {
      packages
    }
  };
}
