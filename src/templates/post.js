import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Scene } from 'scrollmagic'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
// import find from 'lodash.find'
import Helmet from 'react-helmet'
// import Up from '../components/up'
import BgImg from '../components/Background/background'
import { TimelineMax } from 'gsap'

class PostTemplate extends Component {
  static contextTypes = {
    scrollmagic: PropTypes.any,
  }

  componentDidMount() {
    this.createAnimation()

    this.scene = new Scene({
      duration: this.duration,
      triggerElement: this.wrapper,
      triggerHook: 0,
    })
    this.scene.indicatorName = 'Preview'
    this.scene.on('progress', this.updateScroll)

    if (process.env.NODE_ENV === 'development') {
      this.scene.addIndicators({ name: this.scene.indicatorName })
    }

    this.scene.addTo(this.context.scrollmagic)
  }

  destroy() {
    this.scene.destroy()
  }

  componentWillUnmount() {
    this.destroy()
  }

  createAnimation() {
    if (this.animation) this.animation.kill()
    this.animation = new TimelineMax({ paused: true }).fromTo(
      this.subtitle,
      1,
      { opacity: 1, y: '0%' },
      { opacity: 0, y: '-100%', ease: Power2.easeOut }
    )
    this.animDuration = this.animation.duration()
  }

  updateScroll = ({ progress }) => {
    this.animation.tweenTo(this.animDuration * progress)
  }

  duration = () => {
    return this.wrapper.getBoundingClientRect().height
  }

  render() {
    // const { alt, children, reverse, sizes } = this.props
    const {
      title,
      title2,
      category,
      slug,
      description,
      cover,
      images,
    } = this.props.data.contentfulGallery

    // const postIndex = find(
    //     data.allContentfulGallery.edges,
    //     ({ node: post }) => post.id === id
    //   );
    return (
      <div>
        <Helmet>
          <title>{title} - JEAN EMMANUEL RODE PHOTOGRAPHE LILLE</title>
          <meta name='description' content={title} />
          <meta
            property='og:title'
            content={title + ' - JEAN EMMANUEL RODE PHOTOGRAPHE LILLE'}
          />
          <meta property='og:image' content={cover.sizes.src} />
          <meta property='og:image:width' content='1800' />
          <meta property='og:image:height' content='1200' />
          <meta
            property='og:url'
            content={'http://rode-island.com/' + slug + '/'}
          />
        </Helmet>

        <div className='post'>
          <div
            className='post-cover'
            ref={c => {
              this.wrapper = c
            }}
          >
            <h1
              ref={c => {
                this.subtitle = c
              }}
            >
              {title}
              <br />
              {title2}
            </h1>
            <BgImg
              ref={this.refImage}
              height={'75vh'}
              sizes={cover.sizes}
              alt={cover.title}
              title={cover.title}
              backgroundColor={'#f1f1f1'}
            />
          </div>
          <div className='post-info'>
            <div className='post-info__left'>
              <h2 className='post-info-title'>Details</h2>
              <h3 className='post-category'>
                <Link to={'/' + category.categoryslug + '/'}>
                  {category.id}
                </Link>
              </h3>
              {/* {postIndex.previous && (<Link className="post-previous" to={"/" + postIndex.previous.slug + "/"}>Previous</Link>)}
                    {postIndex.next && (<Link className="post-next" to={"/" + postIndex.next.slug + "/"}>Next</Link>)} */}
            </div>
            <div className='post-info__right'>
              <div
                className='post-description'
                dangerouslySetInnerHTML={{
                  __html: description.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
          <ul className='post-images'>
            {images &&
              images.map((images, index) => (
                <li key={index}>
                  <Img
                    sizes={images.sizes}
                    alt={images.title}
                    title={images.title}
                    outerWrapperClassName={images.description}
                    backgroundColor={'#f1f1f1'}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query PostQuery($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
      title
      title2
      id
      slug
      category {
        title
        categoryslug
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      cover {
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_noBase64
        }
      }
      images {
        title
        description
        sizes(maxWidth: 1800) {
          ...GatsbyContentfulSizes_noBase64
        }
      }
    }
  }
`

export default PostTemplate