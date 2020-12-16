import React from 'react'
import { connect } from 'react-redux'
import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import { createStructuredSelector } from 'reselect'

const Directory = ({ sections }) => {
        return (
            <div className="directory-menu">
                {sections.map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps}/>)}

                {/* BEFORE DESTRUCTURING 2: {this.state.sections.map(({ id, title, imageUrl, size, linkUrl }) => <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>)} */}
                {/* BEFORE DESTRUCTURING 1: {this.state.sections.map((section) => <MenuItem key={section.id} title={section.title}/>)} */}
            </div>
        );

}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);
