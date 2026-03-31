import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/common/FoodCard';
import mealService from '../services/mealService';

const HomePage = () => {
  const { addToCart } = useCart();
  const [featuredMeals, setFeaturedMeals] = useState([]);

  useEffect(() => {
    document.body.classList.add('reveal-ready');

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      revealElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    const loadFeaturedMeals = async () => {
      try {
        const meals = await mealService.getMeals();
        setFeaturedMeals(meals.slice(0, 3));
      } catch (error) {
        setFeaturedMeals([]);
      }
    };

    loadFeaturedMeals();
  }, []);

  const categories = [
    { title: 'Salads', subtitle: 'Fresh greens and balanced bowls' },
    { title: 'Protein Meals', subtitle: 'High-protein clean fuel' },
    { title: 'Detox Drinks', subtitle: 'Hydrating natural refreshers' },
  ];

  const highlights = [
    { title: 'Chef crafted', value: '120+', detail: 'healthy recipes prepared daily' },
    { title: 'Avg delivery', value: '24 min', detail: 'city-wide quick doorstep delivery' },
    { title: 'Happy customers', value: '18k+', detail: 'monthly active healthy eaters' },
    { title: 'Freshness score', value: '4.9/5', detail: 'quality rated by users every day' },
  ];

  const journey = [
    {
      title: 'Select your meal style',
      text: 'Pick from clean salads, protein meals, and detox drinks based on your goal.',
    },
    {
      title: 'Personalize and add to cart',
      text: 'Review ratings, ingredients, and nutrition details before checkout.',
    },
    {
      title: 'Track and enjoy fresh delivery',
      text: 'Your order is prepared fresh and delivered fast with live status updates.',
    },
  ];

  const testimonials = [
    {
      quote: 'Nutrivo made healthy eating realistic for my work routine. The quality is always fresh.',
      name: 'Aisha Kapoor',
      role: 'Product Designer',
    },
    {
      quote: 'I switched from random takeout to Nutrivo and feel more energetic every afternoon.',
      name: 'Rahul Mehta',
      role: 'Fitness Coach',
    },
    {
      quote: 'Fast delivery, smart portions, and meals that actually taste premium.',
      name: 'Sneha Verma',
      role: 'Startup Founder',
    },
  ];

  const featuredItems = useMemo(() => featuredMeals, [featuredMeals]);

  return (
    <div className="home-page">
      <section className="hero-section reveal-on-scroll">
        <div className="container hero-grid">
          <div>
            <p className="hero-kicker">Healthy food delivered fast</p>
            <h1>Modern healthy meal ordering made beautifully simple.</h1>
            <p>
              Discover premium salads, protein meals, and detox drinks crafted for your lifestyle.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="primary-btn nav-btn-link">
                Explore Menu
              </Link>
              <Link to="/register" className="secondary-btn nav-btn-link">
                Join Now
              </Link>
            </div>
          </div>
          <div className="hero-highlight-card">
            <h3>Today&apos;s Healthy Pick</h3>
            <p>Rainbow Quinoa Salad + Green Glow Juice</p>
            <span>Combo price: ₹369</span>
          </div>
        </div>
      </section>

      <section className="container section-space reveal-on-scroll">
        <div className="wellness-grid">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="wellness-card reveal-on-scroll"
              style={{ transitionDelay: `${80 + index * 70}ms` }}
            >
              <p>{item.title}</p>
              <h3>{item.value}</h3>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-space reveal-on-scroll">
        <div className="section-title-wrap">
          <h2>Categories</h2>
          <p>Designed for every healthy craving</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="category-card reveal-on-scroll"
              style={{ transitionDelay: `${80 + index * 70}ms` }}
            >
              <h3>{category.title}</h3>
              <p>{category.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-space reveal-on-scroll">
        <div className="section-title-wrap">
          <h2>Featured Meals</h2>
          <Link to="/menu" className="link-btn">
            View All
          </Link>
        </div>
        <div className="food-grid">
          {featuredItems.map((meal) => (
            <FoodCard key={meal.id} meal={meal} onAddToCart={addToCart} />
          ))}
        </div>
        {!featuredItems.length && <p className="status-note">Featured meals will appear from live backend data.</p>}
      </section>

      <section className="container section-space reveal-on-scroll">
        <div className="section-title-wrap">
          <h2>How Nutrivo Works</h2>
          <p>Simple flow, healthier outcomes</p>
        </div>
        <div className="journey-grid">
          {journey.map((step, index) => (
            <article
              key={step.title}
              className="journey-card reveal-on-scroll"
              style={{ transitionDelay: `${80 + index * 80}ms` }}
            >
              <span className="journey-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-space reveal-on-scroll">
        <div className="section-title-wrap">
          <h2>What Customers Say</h2>
          <p>Trusted by people building healthier routines</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="testimonial-card reveal-on-scroll"
              style={{ transitionDelay: `${80 + index * 80}ms` }}
            >
              <p className="testimonial-quote">"{item.quote}"</p>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-space reveal-on-scroll">
        <div className="home-banner reveal-on-scroll" style={{ transitionDelay: '120ms' }}>
          <div>
            <h3>Ready to make your week healthier?</h3>
            <p>Discover seasonal menus updated daily with cleaner ingredients.</p>
          </div>
          <div className="hero-actions">
            <Link to="/menu" className="primary-btn nav-btn-link">
              Order Healthy Now
            </Link>
            <Link to="/register" className="secondary-btn nav-btn-link">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
